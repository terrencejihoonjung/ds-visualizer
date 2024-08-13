import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import { DynamicArrayState } from "../../entities";
import PencilIcon from "../Icons/PencilIcon";
import { Link } from "react-router-dom";
import map from "../../data/data-structures";

const MAX_CELLS = 16;
const defaultArray = {
  array: [1],
  size: 1,
  capacity: 2,
};

type DynamicArrayPGProps = {
  className?: string;
};

function DynamicArrayPG({ className }: DynamicArrayPGProps) {
  const ds = map.get("dynamic-array")!;
  const [state, setState] = useState<DynamicArrayState>(defaultArray);

  const [arrInput, setArrInput] = useState<string>(JSON.stringify(state.array));
  const [pushInput, setPushInput] = useState<string>("");
  const [resizingFactor, setResizingFactor] = useState<number>(2);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && containerRef.current) {
      updateVisualization();
    }
  }, [state, arrInput]);

  const updateVisualization = () => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const cellWidth = 50;
    const cellHeight = 50;

    svg.attr("width", containerWidth).attr("height", containerHeight);

    const g = svg.append("g");

    const cells = g
      .selectAll("g")
      .data(state.array)
      .enter()
      .append("g")
      .attr("transform", (_d, i) => `translate(${i * cellWidth}, 0)`);

    cells
      .append("rect")
      .attr("width", cellWidth - 1)
      .attr("height", cellHeight)
      .attr("fill", "primary")
      .attr("stroke", "primary");

    cells
      .append("text")
      .attr("x", cellWidth / 2)
      .attr("y", cellHeight / 2)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text((d) => d);

    // Add capacity indicators
    g.selectAll(".capacity")
      .data(new Array(state.capacity - state.size).fill(null))
      .enter()
      .append("rect")
      .attr("class", "capacity")
      .attr("x", (_d, i) => (i + state.size) * cellWidth)
      .attr("y", 0)
      .attr("width", cellWidth - 1)
      .attr("height", cellHeight)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-dasharray", "5,5");

    // Calculate the total width of the visualization
    const totalWidth = state.capacity * cellWidth;

    // Center the visualization
    const translateX = (containerWidth - totalWidth) / 2;
    const translateY = (containerHeight - cellHeight) / 2;

    g.attr("transform", `translate(${translateX}, ${translateY})`);
  };

  const push = () => {
    if (pushInput.trim() === "") return;
    const newValue = parseInt(pushInput);
    if (isNaN(newValue)) return;

    setState((prev) => {
      if (prev.array.length >= MAX_CELLS) {
        setErrorMessage(
          `Cannot push: Array size limit (${MAX_CELLS}) reached.`
        );
        return prev;
      }

      const newArray = [...prev.array, newValue];
      let newCapacity = prev.capacity;

      if (newArray.length > prev.capacity) {
        const potentialNewCapacity = Math.ceil(prev.capacity * resizingFactor);
        if (potentialNewCapacity > MAX_CELLS) {
          setErrorMessage(
            `Cannot resize: New capacity (${potentialNewCapacity}) would exceed the limit (${MAX_CELLS}).`
          );
          return prev;
        }
        newCapacity = potentialNewCapacity;
      }

      setErrorMessage("");
      return {
        array: newArray,
        size: newArray.length,
        capacity: newCapacity,
      };
    });
    setPushInput("");
  };

  const pop = () => {
    setState((prev) => {
      if (prev.array.length === 0) return prev;
      const newArray = prev.array.slice(0, -1);
      setErrorMessage("");
      return {
        array: newArray,
        size: newArray.length,
        capacity: prev.capacity,
      };
    });
  };

  const handleReset = () => {
    setState(defaultArray);
    setArrInput(JSON.stringify(defaultArray.array));
    setPushInput("");
    setResizingFactor(2);
    setErrorMessage("");
  };

  const updateState = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setArrInput(input);

    try {
      const parsedArray = JSON.parse(input);
      if (Array.isArray(parsedArray) && parsedArray.length <= MAX_CELLS) {
        setState((state) => ({
          array: parsedArray,
          size: parsedArray.length,
          capacity: Math.max(parsedArray.length, state.capacity),
        }));
        setErrorMessage("");
      } else {
        setErrorMessage(
          `Invalid input: Must be an array with at most ${MAX_CELLS} elements.`
        );
      }
    } catch (error) {
      setErrorMessage("Invalid input: Must be a valid array.");
    }
  };

  const updateResizingFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const parsedInput = parseFloat(input);

    if (input === "" || (parsedInput > 1 && parsedInput <= MAX_CELLS)) {
      setResizingFactor(parsedInput);
    }
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-between space-x-2">
          <input
            type="text"
            value={pushInput}
            onChange={(e) => setPushInput(e.target.value)}
            className="input input-bordered"
            placeholder="Enter a number"
          />
          <button onClick={push} className="btn btn-outline">
            Push
          </button>
          <div className="divider divider-primary divider-horizontal"></div>
          <button onClick={pop} className="btn btn-outline">
            Pop
          </button>
          <div className="divider divider-primary divider-horizontal"></div>
          <button onClick={handleReset} className="btn btn-outline">
            Reset
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
          <span className="font-bold">Size:</span> {state.size}
          <span className="font-bold ml-4">Capacity:</span> {state.capacity}
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
          {/* Array Input */}
          <div className="flex justify-between items-start">
            <h3 className="text-h3 font-bold">Input</h3>
            <textarea
              value={arrInput}
              onChange={updateState}
              className="textarea textarea-bordered textarea-md w-1/2 text-p"
              placeholder="Custom Input"
            />
          </div>

          {/* Resizing Factor Input */}
          <div className="flex justify-between items-center">
            <h3 className="text-h3 font-bold">Resizing Factor</h3>

            <div className="w-1/2">
              <input
                type="range"
                min={2}
                max={5}
                value={resizingFactor}
                onChange={updateResizingFactor}
                className="range"
                step="1"
              />
              <div className="flex w-full justify-between px-2 text-h6 font-bold">
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicArrayPG;
