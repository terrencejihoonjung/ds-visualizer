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
      <circle
        cx={x}
        cy={y}
        r="20"
        fill={isHighlighted ? "yellow" : "black"}
        stroke={"black"}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dy=".3em"
        fill={isHighlighted ? "black" : "white"}
      >
        {node.value}
      </text>

      {node.left && (
        <>
          <line
            x1={x}
            y1={y + 20}
            x2={leftChildX}
            y2={childY - 20}
            stroke="black"
            strokeWidth="1"
          />
          <BinaryNode
            node={node.left}
            x={leftChildX}
            y={childY}
            level={level + 1}
            isHighlighted={node.left.isHighlighted || false}
          />
        </>
      )}

      {node.right && (
        <>
          <line
            x1={x}
            y1={y + 20}
            x2={rightChildX}
            y2={childY - 20}
            stroke="black"
            strokeWidth="1"
          />
          <BinaryNode
            node={node.right}
            x={rightChildX}
            y={childY}
            level={level + 1}
            isHighlighted={node.right.isHighlighted || false}
          />
        </>
      )}
    </g>
  );
}

export default BinaryNode;
