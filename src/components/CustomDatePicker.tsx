import { View, Text, ScrollView } from '@tarojs/components'

import { useState, useMemo } from 'react'

import { t } from '@/i18n'
import { useAppSelector } from '@/store/hooks'

interface CustomDatePickerProps {
  visible: boolean
  selectedDate?: string // 'YYYY-MM-DD'
  minYear?: number
  maxYear?: number
  onConfirm: (date: string) => void
  onCancel: () => void
}

const ITEM_HEIGHT = 44

export default function CustomDatePicker({
  visible,
  selectedDate,
  minYear = 1950,
  maxYear,
  onConfirm,
  onCancel,
}: CustomDatePickerProps) {
  const locale = useAppSelector((state) => state.theme.locale)
  const currentDate = new Date()
  const effectiveMaxYear = maxYear || currentDate.getFullYear()
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-IQ' : 'en-US', { month: 'long' }),
    [locale],
  )

  // Parse initial date or use today
  const parseDate = (dateStr?: string) => {
    if (dateStr) {
      const [y, m, d] = dateStr.split('-').map(Number)
      return { year: y, month: m, day: d }
    }
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    }
  }

  const initial = parseDate(selectedDate)
  const [selectedYear, setSelectedYear] = useState(initial.year)
  const [selectedMonth, setSelectedMonth] = useState(initial.month)
  const [selectedDay, setSelectedDay] = useState(initial.day)

  // Generate arrays
  const years = useMemo(() => {
    const arr: number[] = []
    for (let y = minYear; y <= effectiveMaxYear; y++) arr.push(y)
    return arr
  }, [minYear, effectiveMaxYear])

  const months = useMemo(() => {
    const arr: number[] = []
    for (let m = 1; m <= 12; m++) arr.push(m)
    return arr
  }, [])

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth, 0).getDate()
  }, [selectedYear, selectedMonth])

  const days = useMemo(() => {
    const arr: number[] = []
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [daysInMonth])

  // Clamp day if month changes
  const effectiveDay = Math.min(selectedDay, daysInMonth)

  const handleConfirm = () => {
    const yStr = selectedYear < 1000 ? ('000' + selectedYear).slice(-4) : String(selectedYear)
    const mStr = selectedMonth < 10 ? '0' + selectedMonth : String(selectedMonth)
    const dStr = effectiveDay < 10 ? '0' + effectiveDay : String(effectiveDay)
    onConfirm(`${yStr}-${mStr}-${dStr}`)
  }

  if (!visible) return null

  return (
    <View
      className='fixed inset-0 z-[999] flex flex-col justify-end'
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onCancel}
    >
      {/* Picker Panel */}
      <View
        style={{ backgroundColor: '#1A1A1A', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Cancel / Confirm */}
        <View
          className='flex justify-between items-center'
          style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Text
            style={{ fontSize: '16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-locale-body)' }}
            onClick={onCancel}
          >
            {t('cancel')}
          </Text>
          <Text
            style={{ fontSize: '16px', color: 'var(--primary)', fontWeight: '600', fontFamily: 'var(--font-locale-body)' }}
            onClick={handleConfirm}
          >
            {t('confirm')}
          </Text>
        </View>

        {/* Columns */}
        <View className='flex' style={{ height: `${ITEM_HEIGHT * 5}px`, position: 'relative' }}>
          {/* Selection highlight bar */}
          <View
            style={{
              position: 'absolute',
              top: `${ITEM_HEIGHT * 2}px`,
              left: '0',
              right: '0',
              height: `${ITEM_HEIGHT}px`,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Year Column */}
          <PickerColumn
            items={years}
            selected={selectedYear}
            onSelect={setSelectedYear}
            renderLabel={(y) => String(y)}
          />

          {/* Month Column */}
          <PickerColumn
            items={months}
            selected={selectedMonth}
            onSelect={setSelectedMonth}
            renderLabel={(m) => monthFormatter.format(new Date(2024, m - 1, 1))}
          />

          {/* Day Column */}
          <PickerColumn
            items={days}
            selected={effectiveDay}
            onSelect={setSelectedDay}
            renderLabel={(d) => String(d)}
          />
        </View>
      </View>
    </View>
  )
}

// Individual scrollable column
function PickerColumn({
  items,
  selected,
  onSelect,
  renderLabel,
}: {
  items: number[]
  selected: number
  onSelect: (val: number) => void
  renderLabel: (val: number) => string
}) {
  const selectedIndex = items.indexOf(selected)

  return (
    <View className='flex-1' style={{ height: `${ITEM_HEIGHT * 5}px`, overflow: 'hidden' }}>
      <ScrollView
        className='picker-scroll'
        scrollY
        scrollWithAnimation
        showScrollbar={false}
        enhanced
        scrollTop={Math.max(0, selectedIndex * ITEM_HEIGHT)}
        style={{ height: '100%', scrollbarWidth: 'none' }}
        onScroll={(e) => {
          const scrollTop = e.detail.scrollTop
          const index = Math.round(scrollTop / ITEM_HEIGHT)
          const clamped = Math.max(0, Math.min(index, items.length - 1))
          if (items[clamped] !== selected) {
            onSelect(items[clamped])
          }
        }}
      >
        {/* Top spacer (2 items) so first item can be centered */}
        <View style={{ height: `${ITEM_HEIGHT * 2}px` }} />

        {items.map((item) => {
          const isSelected = item === selected
          return (
            <View
              key={item}
              className='flex items-center justify-center'
              style={{
                height: `${ITEM_HEIGHT}px`,
              }}
              onClick={() => onSelect(item)}
            >
              <Text
                style={{
                  fontSize: isSelected ? '18px' : '15px',
                  fontWeight: isSelected ? '600' : '400',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-locale-body)',
                  opacity: isSelected ? 1 : 0.5,
                }}
              >
                {renderLabel(item)}
              </Text>
            </View>
          )
        })}

        {/* Bottom spacer (2 items) so last item can be centered */}
        <View style={{ height: `${ITEM_HEIGHT * 2}px` }} />
      </ScrollView>
    </View>
  )
}
