import { View, Text, Input, ITouchEvent } from '@tarojs/components'

import { useState, useRef, useEffect } from 'react'

// ─── Reusable Form Field ───
// Styled text input with label, focus-only border, grey-900 background,
// and optional error display. Just drop it in and go.

interface FormFieldProps {
  label: string
  value: string
  placeholder?: string
  onInput: (value: string) => void
  error?: string | null
}

export function FormField({ label, value, placeholder, onInput, error }: FormFieldProps) {
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? 'var(--error)'
    : focused
      ? 'var(--primary)'
      : 'transparent'

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-locale-body)',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {label}
      </Text>
      <Input
        value={value}
        onInput={(e) => onInput(e.detail.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderStyle='color: var(--text-placeholder); font-size: 16px;'
        style={{
          height: 'var(--btn-height)',
          lineHeight: 'var(--btn-height)',
          border: `1px solid ${borderColor}`,
          paddingLeft: '12px',
          paddingRight: '12px',
          fontSize: '16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-locale-body)',
          backgroundColor: '#171717',
          boxSizing: 'border-box',
          width: '100%',
        }}
      />
      {error && (
        <Text
          style={{
            fontSize: '12px',
            color: 'var(--error)',
            fontFamily: 'var(--font-locale-body)',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

// ─── Reusable Dropdown Field ───
// Same look as FormField but with a selectable dropdown menu.

interface DropdownFieldProps {
  label: string
  value: string
  placeholder?: string
  options: string[]
  onSelect: (value: string) => void
  error?: string | null
}

export function DropdownField({ label, value, placeholder, options, onSelect, error }: DropdownFieldProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const borderColor = error
    ? 'var(--error)'
    : open
      ? 'var(--primary)'
      : 'transparent'

  return (
    <View ref={containerRef} style={{ flex: 1, position: 'relative' }}>
      <Text
        style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-locale-body)',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {label}
      </Text>
      <View
        onClick={() => setOpen(!open)}
        style={{
          height: 'var(--btn-height)',
          border: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '12px',
          paddingRight: '12px',
          backgroundColor: '#171717',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        <Text
          style={{
            fontSize: '16px',
            color: value ? 'var(--text-primary)' : 'var(--text-placeholder)',
            fontFamily: 'var(--font-locale-body)',
            flex: 1,
          }}
        >
          {value || placeholder}
        </Text>
        <Text
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          ▼
        </Text>
      </View>

      {/* Menu */}
      {open && (
        <View
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            backgroundColor: '#1a1a1a',
            border: '1px solid var(--border-secondary)',
            zIndex: 100,
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {options.map((opt) => (
            <View
              key={opt}
              onClick={(e: ITouchEvent) => {
                e.stopPropagation()
                onSelect(opt)
                setOpen(false)
              }}
              style={{
                padding: '2px 12px',
                cursor: 'pointer',
                backgroundColor: opt === value ? 'rgba(235, 158, 116, 0.15)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                minHeight: '36px',
              }}
              className='active:opacity-70'
            >
              <Text
                style={{
                  fontSize: '14px',
                  color: opt === value ? 'var(--primary)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-locale-body)',
                }}
              >
                {opt}
              </Text>
            </View>
          ))}
        </View>
      )}

      {error && (
        <Text
          style={{
            fontSize: '12px',
            color: 'var(--error)',
            fontFamily: 'var(--font-locale-body)',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}
