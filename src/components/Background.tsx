import { useMemo } from "react";

interface Transform {
  x: number;
  y: number;
  k: number;
}

interface BackgroundProps {
  color?: string;
  stroke?: number;
  gap?: number;
  transform?: Transform;
}

function Background({
  color = "#F9F9F9",
  stroke = 1,
  gap = 15,
  transform,
}: BackgroundProps) {
  const { x, y, k } = transform || { x: 0, y: 0, k: 1 };
  const scaledGap = gap * k;
  const patternId = useMemo(
    () => `pattern-${Math.floor(Math.random() * 100000)}`,
    []
  );

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none">
      <svg className="w-full h-full">
        <pattern
          id={patternId}
          x={x % scaledGap}
          y={y % scaledGap}
          width={scaledGap}
          height={scaledGap}
          patternUnits="userSpaceOnUse"
        >
          <path
            stroke={color}
            strokeWidth={stroke}
            d={`M${scaledGap / 2} 0 V${scaledGap} M0 ${
              scaledGap / 2
            } H${scaledGap}`}
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    </div>
  );
}

export default Background;
