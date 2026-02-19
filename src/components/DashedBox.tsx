import Taro from "@tarojs/taro";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { View } from "@tarojs/components";

type BorderPosition = "inside" | "outside" | "center";

type DashedBoxProps = {
  width?: number | string;
  height?: number | string;
  dash?: number;
  gap?: number;
  stroke?: number;
  color?: string;
  borderPosition?: BorderPosition;
  style?: React.CSSProperties;
  children?: ReactNode;
};

let _idCounter = 0;

function DashedBox({
  width          = "100%",
  height         = "auto",
  dash           = 6,
  gap            = 6,
  stroke         = 1,
  color          = "#333",
  borderPosition = "inside",
  style          = {},
  children,
}: DashedBoxProps) {
  // Use a unique ID for Taro selector query
  const componentId = useMemo(() => `dashed-box-${++_idCounter}`, []);
  
  // Initialize size from props if they are numbers, otherwise 0
  const [size, setSize] = useState({ 
    w: typeof width === 'number' ? width : 0, 
    h: typeof height === 'number' ? height : 0 
  });

  useEffect(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      setSize({ w: width, h: height });
    }
  }, [width, height]);


  useEffect(() => {
    const selector = `#${componentId}`;
    
    // 1. Try ResizeObserver if available (Web / compatible envs)
    if (typeof ResizeObserver !== 'undefined' && typeof document !== 'undefined') {
      const element = document.getElementById(componentId);
      if (element) {
        const observer = new ResizeObserver(([entry]) => {
          setSize({
            w: entry.contentRect.width,
            h: entry.contentRect.height,
          });
        });
        observer.observe(element);
        return () => observer.disconnect();
      }
    }

    // 2. Fallback: Taro.createSelectorQuery
    const measure = () => {
      Taro.createSelectorQuery()
        .select(selector)
        .boundingClientRect((rect) => {
          if (rect && !Array.isArray(rect)) {
            setSize({ w: rect.width, h: rect.height });
          }
        })
        .exec();
    };

    setTimeout(measure, 50);
    setTimeout(measure, 500); // Retry for safety
    
  }, [componentId]); 

  // Generate SVG string for mask
  // We draw a rect with stroke-dasharray
  const { w, h } = size;

  const originalSvgW   = w + stroke * (borderPosition === "outside" ? 1 : borderPosition === "inside" ? -1 : 0);
  const originalSvgH   = h + stroke * (borderPosition === "outside" ? 1 : borderPosition === "inside" ? -1 : 0);
  const originalSvgTop = borderPosition === "outside" ? -stroke / 2 : borderPosition === "inside" ? stroke / 2 : 0; 
  
  // Generate Dash Array (logic from before)
  function calcDashes(sideLength: number, d: number, g: number) {
    if (sideLength <= 0) return "0 0";
    const ratio = g / d;
    let dashCount = Math.round((sideLength / d + ratio) / (1 + ratio));
    if (dashCount % 2 === 0) dashCount += 1;
    if (dashCount < 1) dashCount = 1;
    const actualD = sideLength / (dashCount * (1 + ratio) - ratio);
    const actualG = actualD * ratio;
    return `${actualD} ${actualG}`;
  }
  
  const dashW = calcDashes(originalSvgW, dash, gap);
  const dashH = calcDashes(originalSvgH, dash, gap);
  
  // Note: encoded URL must not have line breaks.
  const svgContent = `
    <svg width='${originalSvgW}' height='${originalSvgH}' viewBox='0 0 ${originalSvgW} ${originalSvgH}' xmlns='http://www.w3.org/2000/svg'>
      <line x1='0' y1='0' x2='${originalSvgW}' y2='0' stroke='black' stroke-width='${stroke}' stroke-dasharray='${dashW}' />
      <line x1='0' y1='${originalSvgH}' x2='${originalSvgW}' y2='${originalSvgH}' stroke='black' stroke-width='${stroke}' stroke-dasharray='${dashW}' />
      <line x1='0' y1='0' x2='0' y2='${originalSvgH}' stroke='black' stroke-width='${stroke}' stroke-dasharray='${dashH}' />
      <line x1='${originalSvgW}' y1='0' x2='${originalSvgW}' y2='${originalSvgH}' stroke='black' stroke-width='${stroke}' stroke-dasharray='${dashH}' />
    </svg>
  `.replace(/\n/g, '').replace(/\s+/g, ' ');
  
  const encodedSvg = encodeURIComponent(svgContent);
  const maskImage = `url("data:image/svg+xml,${encodedSvg}")`;

  return (
    <View
      id={componentId}
      style={{ position: "relative", width, height, ...style }}
    >
      {w > 0 && h > 0 && (
        <View
          style={{
            position: "absolute",
            top: originalSvgTop,
            left: originalSvgTop,
            width: originalSvgW,
            height: originalSvgH,
            pointerEvents: "none",
            backgroundColor: color,
            maskImage: maskImage,
            WebkitMaskImage: maskImage,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            zIndex: 0,
          }}
        />
      )}

      {children}
    </View>
  );
}

export default DashedBox;