import { TreeNode } from "../../../entities";

type BinaryNodeProps = {
  node: TreeNode;
  x: number;
  y: number;
  level: number;
  isHighlighted: boolean;
};

const VERTICAL_SPACING = 60;
const HORIZONTAL_SPACING = 40;

function BinaryNode({ node, x, y, level, isHighlighted }: BinaryNodeProps) {
  const leftChildX = x - HORIZONTAL_SPACING / (level + 1);
  const rightChildX = x + HORIZONTAL_SPACING / (level + 1);
  const childY = y + VERTICAL_SPACING;

  return (
    <g>
      {node.left && (
        <line
          x1={x}
          y1={y}
          x2={leftChildX}
          y2={childY}
          stroke="black"
          strokeWidth="1"
        />
      )}
      {node.right && (
        <line
          x1={x}
          y1={y}
          x2={rightChildX}
          y2={childY}
          stroke="black"
          strokeWidth="1"
        />
      )}
      <g transform={`translate(${x}, ${y})`}>
        <circle
          r="20"
          fill={isHighlighted ? "yellow" : "var(--primary)"}
          stroke={isHighlighted ? "black" : "none"}
          strokeWidth="2"
        />
        <text
          textAnchor="middle"
          dy=".3em"
          fill={isHighlighted ? "black" : "white"}
        >
          {node.value}
        </text>
      </g>
      {node.left && (
        <BinaryNode
          node={node.left}
          x={leftChildX}
          y={childY}
          level={level + 1}
          isHighlighted={node.left.isHighlighted}
        />
      )}
      {node.right && (
        <BinaryNode
          node={node.right}
          x={rightChildX}
          y={childY}
          level={level + 1}
          isHighlighted={node.right.isHighlighted}
        />
      )}
    </g>
  );
}

export default BinaryNode;
