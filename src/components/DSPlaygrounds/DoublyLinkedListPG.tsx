import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { PlaygroundProps } from "../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../Icons/PencilIcon";
import map from "../../data/data-structures";

interface Node {
  value: number;
  next: Node | null;
  prev: Node | null;
}

const MAX_NODES = 9;

function DoublyLinkedListPG({ className }: PlaygroundProps) {
  const ds = map.get("doubly-linked-list")!;
  const [head, setHead] = useState<Node | null>(null);
  const [tail, setTail] = useState<Node | null>(null);
  const [size, setSize] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [insertAtPositionValue, setInsertAtPositionValue] =
    useState<string>("");
  const [insertPositionInput, setInsertPositionInput] = useState<string>("");
  const [deletePositionInput, setDeletePositionInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgRef.current && containerRef.current) {
      updateVisualization();
    }
  }, [head, tail, size]);

  const updateVisualization = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const containerWidth = containerRef.current?.clientWidth || 600;
    const containerHeight = containerRef.current?.clientHeight || 100;
    const nodeRadius = 20;
    const nodeSpacing = 100;

    const totalWidth = Math.max(
      containerWidth,
      (size - 1) * nodeSpacing + 2 * nodeRadius
    );
    const scaleFactor = Math.min(1, containerWidth / totalWidth);

    svg.attr("width", containerWidth).attr("height", containerHeight);

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${containerWidth / 2}, ${containerHeight / 2})`
      );

    const scaledGroup = g
      .append("g")
      .attr("transform", `scale(${scaleFactor})`);

    let currentNode = head;
    let index = 0;

    while (currentNode !== null) {
      const nodeG = scaledGroup
        .append("g")
        .attr(
          "transform",
          `translate(${(index - (size - 1) / 2) * nodeSpacing}, 0)`
        );

      // Node circle
      nodeG
        .append("circle")
        .attr("r", nodeRadius)
        .attr("fill", "primary")
        .attr("stroke", "primary");

      // Node value
      nodeG
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("fill", "white")
        .text(currentNode.value);

      // Arrow to next node
      if (currentNode.next !== null) {
        scaledGroup
          .append("path")
          .attr(
            "d",
            `M${(index - (size - 1) / 2) * nodeSpacing + nodeRadius + 5},0 L${
              (index + 1 - (size - 1) / 2) * nodeSpacing - nodeRadius - 2
            },0`
          )
          .attr("stroke", "black")
          .attr("marker-end", "url(#arrowhead-next)");
      }

      // Arrow to previous node
      if (currentNode.prev !== null) {
        scaledGroup
          .append("path")
          .attr(
            "d",
            `M${(index - (size - 1) / 2) * nodeSpacing - nodeRadius - 5},0 L${
              (index - 1 - (size - 1) / 2) * nodeSpacing + nodeRadius + 5
            },0`
          )
          .attr("stroke", "black")
          .attr("marker-end", "url(#arrowhead-prev)");
      }

      currentNode = currentNode.next;
      index++;
    }

    // Arrow marker definitions
    svg
      .append("defs")
      .selectAll("marker")
      .data(["next", "prev"])
      .enter()
      .append("marker")
      .attr("id", (d) => `arrowhead-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", (d) => (d === "next" ? 8 : 2))
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", (d) => (d === "next" ? "auto" : "auto-start-reverse"))
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "black");
  };

  const insertAtHead = () => {
    if (size >= MAX_NODES) {
      setErrorMessage(
        `Cannot insert: Maximum number of nodes (${MAX_NODES}) reached.`
      );
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    const newNode: Node = { value, next: head, prev: null };
    if (head) head.prev = newNode;
    setHead(newNode);
    if (!tail) setTail(newNode);
    setSize((prevSize) => prevSize + 1);
    setInputValue("");
    setErrorMessage("");
  };

  const deleteAtHead = () => {
    if (!head) {
      setErrorMessage("The list is empty");
      return;
    }

    const newHead = head.next;
    if (newHead) {
      newHead.prev = null;
      setHead(newHead);
    } else {
      setHead(null);
      setTail(null);
    }
    setSize((prevSize) => prevSize - 1);
    setErrorMessage("");
  };

  const insertAtTail = () => {
    if (size >= MAX_NODES) {
      setErrorMessage(
        `Cannot insert: Maximum number of nodes (${MAX_NODES}) reached.`
      );
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }

    const newNode: Node = { value, next: null, prev: tail };
    if (tail) tail.next = newNode;
    setTail(newNode);
    if (!head) setHead(newNode);
    setSize((prevSize) => prevSize + 1);
    setInputValue("");
    setErrorMessage("");
  };

  const deleteAtTail = () => {
    if (!tail) {
      setErrorMessage("The list is empty");
      return;
    }

    const newTail = tail.prev;
    if (newTail) {
      newTail.next = null;
      setTail(newTail);
    } else {
      setHead(null);
      setTail(null);
    }
    setSize((prevSize) => prevSize - 1);
    setErrorMessage("");
  };

  const insertAtPosition = () => {
    if (size >= MAX_NODES) {
      setErrorMessage(
        `Cannot insert: Maximum number of nodes (${MAX_NODES}) reached.`
      );
      return;
    }

    const value = parseInt(insertAtPositionValue);
    const position = parseInt(insertPositionInput);

    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number for value");
      return;
    }

    if (isNaN(position)) {
      setErrorMessage("Please enter a valid number for position");
      return;
    }

    if (position < 0 || position > size) {
      setErrorMessage(`Position must be between 0 and ${size}`);
      return;
    }

    if (position === 0) {
      insertAtHead();
      return;
    }

    if (position === size) {
      insertAtTail();
      return;
    }

    let current = head;
    for (let i = 0; i < position - 1; i++) {
      if (current === null) break;
      current = current.next;
    }

    if (current === null) {
      setErrorMessage("Invalid position");
      return;
    }

    const newNode: Node = { value, next: current.next, prev: current };
    if (current.next) current.next.prev = newNode;
    current.next = newNode;

    setSize((prevSize) => prevSize + 1);
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
      deleteAtHead();
      return;
    }

    if (position === size - 1) {
      deleteAtTail();
      return;
    }

    let current = head;
    for (let i = 0; i < position; i++) {
      if (current === null) break;
      current = current.next;
    }

    if (current === null) {
      setErrorMessage("Invalid position");
      return;
    }

    if (current.prev) current.prev.next = current.next;
    if (current.next) current.next.prev = current.prev;

    setSize((prevSize) => prevSize - 1);
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
      <div
        ref={containerRef}
        className="relative p-4 h-playground w-full flex flex-col justify-center items-center border border-black rounded-md"
      >
        <div className="absolute top-0 left-0 p-3 text-lg">
          <span className="font-bold">Size:</span> {size}
        </div>

        <svg className="w-full h-full" ref={svgRef}></svg>
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

export default DoublyLinkedListPG;
