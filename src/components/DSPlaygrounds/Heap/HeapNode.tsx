import React from "react";

interface HeapNodeProps {
  value: number;
  x: number;
  y: number;
}

const HeapNode: React.FC<HeapNodeProps> = ({ value, x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="20" fill="var(--primary)" />
      <text textAnchor="middle" dy=".3em" fill="white">
        {value}
      </text>
    </g>
  );
};

export default HeapNode;
