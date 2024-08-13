import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { PlaygroundProps } from "../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../Icons/PencilIcon";
import map from "../../data/data-structures";

interface Node {
  value: number;
  next: Node | null;
}

function SinglyLinkedListPG({ className }: PlaygroundProps) {
  const ds = map.get("singly-linked-list")!;
  const [head, setHead] = useState<Node | null>(null);
  const [size, setSize] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [insertAtPositionValue, setInsertAtPositionValue] =
    useState<string>("");
  const [insertPositionInput, setInsertPositionInput] = useState<string>("");
  const [deletePositionInput, setDeletePositionInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      updateVisualization();
    }
  }, [head, size]);

  const updateVisualization = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 100;
    const nodeRadius = 20;
    const nodeSpacing = 80;

    svg.attr("width", width).attr("height", height);

    let currentNode = head;
    let index = 0;

    while (currentNode !== null) {
      const g = svg
        .append("g")
        .attr(
          "transform",
          `translate(${index * nodeSpacing + nodeRadius}, ${height / 2})`
        );

      // Node circle
      g.append("circle")
        .attr("r", nodeRadius)
        .attr("fill", "primary")
        .attr("stroke", "primary");

      // Node value
      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("fill", "white")
        .text(currentNode.value);

      // Arrow to next node
      if (currentNode.next !== null) {
        svg
          .append("path")
          .attr(
            "d",
            `M${index * nodeSpacing + nodeRadius * 2},${height / 2} L${
              (index + 1) * nodeSpacing
            },${height / 2}`
          )
          .attr("stroke", "black")
          .attr("marker-end", "url(#arrowhead)");
      }

      currentNode = currentNode.next;
      index++;
    }

    // Arrow marker definition
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("refX", 6)
      .attr("refY", 3)
      .attr("markerWidth", 10)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L6,3 L0,6")
      .attr("fill", "black");
  };

  const insertAtHead = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    const newNode: Node = { value, next: head };
    setHead(newNode);
    setSize(size + 1);
    setInputValue("");
    setErrorMessage("");
  };

  const deleteAtHead = () => {
    if (head === null) {
      setErrorMessage("The list is empty");
      return;
    }

    setHead(head.next);
    setSize(size - 1);
    setErrorMessage("");
  };

  const insertAtTail = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    const newNode: Node = { value, next: null };
    if (head === null) {
      setHead(newNode);
    } else {
      let current = head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    setSize(size + 1);
    setInputValue("");
    setErrorMessage("");
  };

  const deleteAtTail = () => {
    if (head === null) {
      setErrorMessage("The list is empty");
      return;
    }

    if (head.next === null) {
      setHead(null);
    } else {
      let current = head;
      while (current.next!.next !== null) {
        current = current.next!;
      }
      current.next = null;
    }
    setSize(size - 1);
    setErrorMessage("");
  };

  const insertAtPosition = () => {
    const value = parseInt(insertAtPositionValue);
    const position = parseInt(insertPositionInput);

    if (isNaN(value) || isNaN(position)) {
      setErrorMessage("Please enter valid numbers for value and position");
      return;
    }

    if (position < 0 || position > size) {
      setErrorMessage(`Position must be between 0 and ${size}`);
      return;
    }

    if (position === 0) {
      const newNode: Node = { value, next: head };
      setHead(newNode);
    } else {
      let current = head;
      for (let i = 0; i < position - 1; i++) {
        if (current === null) break;
        current = current.next;
      }

      if (current === null) {
        setErrorMessage("Invalid position");
        return;
      }

      const newNode: Node = { value, next: current.next };
      current.next = newNode;
    }

    setSize(size + 1);
    setInsertAtPositionValue("");
    setInsertPositionInput("");
    setErrorMessage("");
  };

  const deleteAtPosition = () => {
    const position = parseInt(deletePositionInput);

    if (isNaN(position)) {
      setErrorMessage("Please enter a valid position");
      return;
    }

    if (position < 0 || position >= size) {
      setErrorMessage(`Position must be between 0 and ${size - 1}`);
      return;
    }

    if (position === 0) {
      setHead(head!.next);
    } else {
      let current = head;
      for (let i = 0; i < position - 1; i++) {
        if (current === null || current.next === null) break;
        current = current.next;
      }

      if (current === null || current.next === null) {
        setErrorMessage("Invalid position");
        return;
      }

      current.next = current.next.next;
    }

    setSize(size - 1);
    setDeletePositionInput("");
    setErrorMessage("");
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Main Action */}
      <div className="flex justify-between items-center">
        <div className="flex items-between space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input input-bordered"
            placeholder="Enter a number"
          />
          <button onClick={insertAtHead} className="btn btn-outline">
            Insert at Head
          </button>
          <div className="divider divider-primary divider-horizontal"></div>
          <button onClick={insertAtTail} className="btn btn-outline">
            Insert at Tail
          </button>
          <div className="divider divider-primary divider-horizontal"></div>
          <button onClick={deleteAtHead} className="btn btn-outline">
            Delete at Head
          </button>
          <div className="divider divider-primary divider-horizontal"></div>
          <button onClick={deleteAtTail} className="btn btn-outline">
            Delete at Tail
          </button>
        </div>
        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Visualization Window */}
      <div className="relative p-4 h-playground w-full flex flex-col justify-center items-center border border-black rounded-md">
        <div className="absolute top-0 left-0 p-3 text-lg">
          <span className="font-bold">Size:</span> {size}
        </div>

        <svg ref={svgRef}></svg>
      </div>

      {/* Options */}
      <div className="flex flex-col items-start w-full">
        <h2 className="text-h2 underline font-bold mb-4">Options</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <div className="w-full flex flex-col space-y-4">
          {/* Insert at position */}
          <div className="flex justify-between items-start">
            <h3 className="text-h3 font-bold">Insert at</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={insertAtPositionValue}
                onChange={(e) => setInsertAtPositionValue(e.target.value)}
                className="input input-bordered"
                placeholder="Value"
              />
              <input
                type="text"
                value={insertPositionInput}
                onChange={(e) => setInsertPositionInput(e.target.value)}
                className="input input-bordered"
                placeholder="Position"
              />
              <button onClick={insertAtPosition} className="btn btn-outline">
                Insert
              </button>
            </div>
          </div>

          {/* Delete at position */}
          <div className="flex justify-between items-start">
            <h3 className="text-h3 font-bold">Delete at</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={deletePositionInput}
                onChange={(e) => setDeletePositionInput(e.target.value)}
                className="input input-bordered"
                placeholder="Position"
              />
              <button onClick={deleteAtPosition} className="btn btn-outline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglyLinkedListPG;
