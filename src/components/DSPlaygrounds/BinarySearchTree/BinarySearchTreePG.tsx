import React, { useState } from "react";
import { PlaygroundProps, TreeNode } from "../../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../../Icons/PencilIcon";
import map from "../../../data/data-structures";
import BinaryNode from "./BinaryNode";

const MAX_DEPTH = 6;

function BinarySearchTreePG({ className }: PlaygroundProps) {
  const ds = map.get("binary-search-tree")!;
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTraversing, setIsTraversing] = useState(false);

  const insert = (
    node: TreeNode | null,
    value: number,
    depth: number = 1
  ): TreeNode | null => {
    if (depth > MAX_DEPTH) {
      setErrorMessage(`Cannot insert: Maximum depth of ${MAX_DEPTH} reached`);
      return node;
    }

    if (node === null) {
      return { value, left: null, right: null, isHighlighted: false };
    }

    if (value < node.value) {
      return { ...node, left: insert(node.left, value, depth + 1) };
    } else if (value > node.value) {
      return { ...node, right: insert(node.right, value, depth + 1) };
    }

    setErrorMessage("Value already exists in the tree");
    return node;
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    setRoot((prevRoot) => insert(prevRoot, value));
    setInputValue("");
  };

  const findMin = (node: TreeNode): TreeNode => {
    let curr = node;
    while (curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  };

  const deleteNode = (
    node: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (node === null) return null;

    if (value < node.value) {
      return { ...node, left: deleteNode(node.left, value) };
    } else if (value > node.value) {
      return { ...node, right: deleteNode(node.right, value) };
    }

    // Node to delete found
    else {
      // Case 1 - Leaf Node
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case 2 - Node with 1 child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // Case 3 - Node with 2 children
      const minNode = findMin(node.right);
      return {
        ...node,
        value: minNode.value,
        right: deleteNode(node.right, minNode.value),
      };
    }
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }
    setRoot((prevRoot) => deleteNode(prevRoot, value));
    setInputValue("");
    setErrorMessage("");
  };

  const resetHighlight = () => {
    setRoot(resetNodeHighlight(root));
  };

  const resetNodeHighlight = (node: TreeNode | null): TreeNode | null => {
    if (!node) return null;
    return {
      ...node,
      isHighlighted: false,
      left: resetNodeHighlight(node.left),
      right: resetNodeHighlight(node.right),
    };
  };

  const traverse = (type: "inorder" | "preorder" | "postorder") => {
    if (isTraversing) return;
    setIsTraversing(true);
    resetHighlight();
    const delay = 1000; // 1 second delay between highlights

    const getTraversalOrder = (node: TreeNode | null): number[] => {
      const result: number[] = [];
      const stack: [TreeNode | null, string][] = [[node, ""]];

      while (stack.length > 0) {
        const [current, state] = stack.pop()!;

        if (current === null) continue;

        if (type === "preorder" && state === "") {
          result.push(current.value);
        }

        if (state === "") {
          stack.push([current, "right"]);
          stack.push([current.right, ""]);
          stack.push([current, "left"]);
          stack.push([current.left, ""]);
        } else if (state === "left") {
          if (type === "inorder") {
            result.push(current.value);
          }
        } else if (state === "right") {
          if (type === "postorder") {
            result.push(current.value);
          }
        }
      }

      return result;
    };

    const traversalOrder = getTraversalOrder(root);

    traversalOrder.forEach((value, index) => {
      setTimeout(() => {
        setRoot((prevRoot) => highlightNode(prevRoot, value));
        if (index === traversalOrder.length - 1) {
          setIsTraversing(false);
        }
      }, delay * index);
    });
  };

  const highlightNode = (
    node: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (!node) return null;
    return {
      ...node,
      isHighlighted: node.value === value,
      left: highlightNode(node.left, value),
      right: highlightNode(node.right, value),
    };
  };

  const renderTree = (
    node: TreeNode | null,
    x: number,
    y: number,
    level: number
  ): React.ReactNode => {
    if (!node || level > MAX_DEPTH) return null;
    return (
      <BinaryNode
        node={node}
        x={x}
        y={y}
        level={level}
        isHighlighted={node.isHighlighted}
      />
    );
  };

  return (
    <div className={`flex flex-col h-full w-full space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input input-bordered"
            placeholder="Enter a number"
          />
          <button onClick={handleInsert} className="btn btn-outline">
            Insert
          </button>
          <button onClick={handleDelete} className="btn btn-outline">
            Delete
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => traverse("inorder")}
            className="btn btn-outline"
            disabled={isTraversing}
          >
            In-order
          </button>
          <button
            onClick={() => traverse("preorder")}
            className="btn btn-outline"
            disabled={isTraversing}
          >
            Pre-order
          </button>
          <button
            onClick={() => traverse("postorder")}
            className="btn btn-outline"
            disabled={isTraversing}
          >
            Post-order
          </button>
          <button
            onClick={resetHighlight}
            className="btn btn-outline"
            disabled={isTraversing}
          >
            Reset
          </button>
        </div>
        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Error Messages */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {/* Visualization Window */}
      <div className="relative p-4 w-full border border-black rounded-md overflow-auto">
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <g transform="translate(400, 40)">
            {root && renderTree(root, 0, 0, 1)}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default BinarySearchTreePG;
