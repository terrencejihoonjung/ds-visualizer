import { useState } from "react";
import { PlaygroundProps, TreeNode } from "../../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../../Icons/PencilIcon";
import map from "../../../data/data-structures";
import BinaryNode from "./BinaryNode";

function BinarySearchTreePG({ className }: PlaygroundProps) {
  const ds = map.get("binary-search-tree")!;
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (node === null) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      return { ...node, left: insert(node.left, value) };
    } else if (value > node.value) {
      return { ...node, right: insert(node.right, value) };
    }

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
    setErrorMessage("");
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

  return (
    <div className={`flex flex-col w-full grow space-y-4 ${className}`}>
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
        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Visualization Window - To be implemented */}
      <div className="relative p-4 grow w-full border border-black rounded-md overflow-auto">
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <g transform="translate(400, 40)">
            {root && <BinaryNode node={root} x={0} y={0} level={0} />}
          </g>
        </svg>
      </div>

      {/* Error Messages */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
    </div>
  );
}

export default BinarySearchTreePG;
