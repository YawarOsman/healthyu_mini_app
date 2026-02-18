import { ReactNode, useRef, useEffect, useState } from "react";

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

function DashedBox({
  width          = "100%",
  height         = "auto",
  dash           = 5.7,
  gap            = 5,
  stroke         = 1,
  color          = "var(--primary)",
  borderPosition = "inside",
  style          = {},
  children,
}: DashedBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  function calcDashes(sideLength: number) {
    if (sideLength <= 0) return "0 0";
    const ratio = gap / dash;
    let dashCount = Math.round((sideLength / dash + ratio) / (1 + ratio));
    if (dashCount % 2 === 0) dashCount += 1;
    if (dashCount < 1) dashCount = 1;
    const d = sideLength / (dashCount * (1 + ratio) - ratio);
    const g = d * ratio;
    return `${d} ${g}`;
  }

  const shared = {
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "butt" as const,
    strokeDashoffset: 0,
  };

  const { w, h } = size;

  const svgW   = w + stroke * (borderPosition === "outside" ? 1 : borderPosition === "inside" ? -1 : 0);
  const svgH   = h + stroke * (borderPosition === "outside" ? 1 : borderPosition === "inside" ? -1 : 0);
  const svgTop = borderPosition === "outside" ? -stroke / 2 : borderPosition === "inside" ? stroke / 2 : 0;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width, height, ...style }}  // ← your flex/align styles apply here
    >
      {/* SVG border — pointer-events none so it never blocks children */}
      {w > 0 && h > 0 && (
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ position: "absolute", top: svgTop, left: svgTop, pointerEvents: "none", overflow: "visible" }}
        >
          <line x1={0}    y1={0}    x2={svgW} y2={0}    strokeDasharray={calcDashes(svgW)} {...shared} />
          <line x1={0}    y1={svgH} x2={svgW} y2={svgH} strokeDasharray={calcDashes(svgW)} {...shared} />
          <line x1={0}    y1={0}    x2={0}    y2={svgH} strokeDasharray={calcDashes(svgH)} {...shared} />
          <line x1={svgW} y1={0}    x2={svgW} y2={svgH} strokeDasharray={calcDashes(svgH)} {...shared} />
        </svg>
      )}

      {/* Children sit directly in the outer div — inherits all your flex/align styles */}
      {children}
    </div>
  );
}

export default DashedBox;