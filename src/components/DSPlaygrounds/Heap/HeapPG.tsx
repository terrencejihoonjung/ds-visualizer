import React, { useState, useRef } from "react";
import { PlaygroundProps } from "../../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../../Icons/PencilIcon";
import map from "../../../data/data-structures";
import HeapNode from "./HeapNode";

interface HeapNodeData {
  value: number;
}

const MAX_DEPTH = 4;
const MAX_NODES = Math.pow(2, MAX_DEPTH) - 1; // 15 nodes for a depth of 4

function HeapPG({ className }: PlaygroundProps) {
  const ds = map.get("heap")!;
  const [heap, setHeap] = useState<HeapNodeData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinHeap, setIsMinHeap] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const insert = (value: number) => {
    if (heap.length >= MAX_NODES) {
      setErrorMessage(`Cannot insert: Heap is full (max ${MAX_NODES} nodes)`);
      return;
    }

    const newHeap = [...heap, { value }];
    let currentIdx = newHeap.length - 1;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (
        (isMinHeap && newHeap[currentIdx].value < newHeap[parentIdx].value) ||
        (!isMinHeap && newHeap[currentIdx].value > newHeap[parentIdx].value)
      ) {
        [newHeap[currentIdx], newHeap[parentIdx]] = [
          newHeap[parentIdx],
          newHeap[currentIdx],
        ];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }

    setHeap(newHeap);
    setErrorMessage("");
  };

  const extractTop = () => {
    if (heap.length === 0) {
      setErrorMessage("Heap is empty");
      return;
    }

    const newHeap = [...heap];
    const extractedValue = newHeap[0].value;
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    let currentIdx = 0;
    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let swapIdx = null;

      if (leftChildIdx < newHeap.length) {
        if (
          (isMinHeap &&
            newHeap[leftChildIdx].value < newHeap[currentIdx].value) ||
          (!isMinHeap &&
            newHeap[leftChildIdx].value > newHeap[currentIdx].value)
        ) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < newHeap.length) {
        if (
          (isMinHeap &&
            newHeap[rightChildIdx].value <
              newHeap[swapIdx || currentIdx].value) ||
          (!isMinHeap &&
            newHeap[rightChildIdx].value > newHeap[swapIdx || currentIdx].value)
        ) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;

      [newHeap[currentIdx], newHeap[swapIdx]] = [
        newHeap[swapIdx],
        newHeap[currentIdx],
      ];
      currentIdx = swapIdx;
    }

    setHeap(newHeap);
    setErrorMessage(
      `Extracted ${isMinHeap ? "minimum" : "maximum"} value: ${extractedValue}`
    );
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }
    insert(value);
    setInputValue("");
  };

  const reset = () => {
    setHeap([]);
    setInputValue("");
    setErrorMessage("");
  };

  const toggleHeapType = () => {
    setIsMinHeap(!isMinHeap);
    reset();
  };

  const renderHeapTree = () => {
    if (!containerRef.current) return null;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const nodeRadius = 20;
    const levelHeight = nodeRadius * 3;
    const svgHeight = MAX_DEPTH * levelHeight;

    const renderNode = (
      index: number,
      x: number,
      y: number,
      levelWidth: number
    ) => {
      if (index >= heap.length || index >= MAX_NODES) return null;

      const node = heap[index];
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      return (
        <g key={index}>
          {leftChildIndex < heap.length && leftChildIndex < MAX_NODES && (
            <line
              x1={x}
              y1={y}
              x2={x - levelWidth / 4}
              y2={y + levelHeight}
              stroke="black"
            />
          )}
          {rightChildIndex < heap.length && rightChildIndex < MAX_NODES && (
            <line
              x1={x}
              y1={y}
              x2={x + levelWidth / 4}
              y2={y + levelHeight}
              stroke="black"
            />
          )}
          <HeapNode value={node.value} x={x} y={y} />
          {renderNode(
            leftChildIndex,
            x - levelWidth / 4,
            y + levelHeight,
            levelWidth / 2
          )}
          {renderNode(
            rightChildIndex,
            x + levelWidth / 4,
            y + levelHeight,
            levelWidth / 2
          )}
        </g>
      );
    };

    return (
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${containerWidth} ${svgHeight}`}
      >
        <g transform={`translate(${containerWidth / 2}, ${nodeRadius})`}>
          {renderNode(0, 0, 0, containerWidth / 2)}
        </g>
      </svg>
    );
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
          <button onClick={extractTop} className="btn btn-outline">
            Extract {isMinHeap ? "Min" : "Max"}
          </button>
          <button onClick={reset} className="btn btn-outline">
            Reset
          </button>
          <button onClick={toggleHeapType} className="btn btn-outline">
            Switch to {isMinHeap ? "Max" : "Min"} Heap
          </button>
        </div>
        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Visualization Window */}
      <div
        ref={containerRef}
        className="relative p-4 h-fit w-full border border-black rounded-md overflow-auto"
        style={{ height: "400px" }}
      >
        {renderHeapTree()}
      </div>

      {/* Error Messages */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
    </div>
  );
}

export default HeapPG;
