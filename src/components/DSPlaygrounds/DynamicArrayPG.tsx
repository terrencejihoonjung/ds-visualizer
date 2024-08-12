import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import { DynamicArrayState } from "../../entities";

function DynamicArrayPG() {
  // array state (arr, size, capacity)
  const [state, setState] = useState<DynamicArrayState>({
    array: [1],
    size: 1,
    capacity: 2,
  });

  const [arrInput, setArrInput] = useState<string>(JSON.stringify(state.array)); // arr-input
  const [pushInput, setPushInput] = useState<string>(""); // push-input
  const [resizingFactor, setResizingFactor] = useState<string>("2"); // resizing factor input
  const svgRef = useRef<SVGSVGElement>(null); // visualization state

  useEffect(() => {
    // fill in any empty inputs
    if (resizingFactor.length === 0) setResizingFactor("2");

    // update the visualization with the valid array state
    if (svgRef.current) {
      updateVisualization();
    }
  }, [state, arrInput]);

  const updateVisualization = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 100;
    const cellWidth = 50;
    const cellHeight = 50;

    svg.attr("width", width).attr("height", height);

    const cells = svg
      .selectAll("g")
      .data(state.array)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * cellWidth}, 0)`);

    cells
      .append("rect")
      .attr("width", cellWidth - 1)
      .attr("height", cellHeight)
      .attr("fill", "#e2e8f0")
      .attr("stroke", "#4a5568");

    cells
      .append("text")
      .attr("x", cellWidth / 2)
      .attr("y", cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text((d) => d);

    // Add capacity indicators
    const capacityCells = svg
      .selectAll(".capacity")
      .data(new Array(state.capacity - state.size).fill(null))
      .enter()
      .append("rect")
      .attr("class", "capacity")
      .attr("x", (d, i) => (i + state.size) * cellWidth)
      .attr("y", 0)
      .attr("width", cellWidth - 1)
      .attr("height", cellHeight)
      .attr("fill", "none")
      .attr("stroke", "#a0aec0")
      .attr("stroke-dasharray", "5,5");
  };

  const push = () => {
    if (pushInput.trim() === "") return;
    const newValue = parseInt(pushInput);
    if (isNaN(newValue)) return;

    setState((prev) => {
      const newArray = [...prev.array, newValue];
      let newCapacity = prev.capacity;
      if (newArray.length > prev.capacity) {
        newCapacity = Math.ceil(prev.capacity * parseFloat(resizingFactor));
      }
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
      return {
        array: newArray,
        size: newArray.length,
        capacity: prev.capacity,
      };
    });
  };

  const updateState = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setArrInput(input);

    // if input is valid update array state
    if (input[0] === "[" && input[input.length - 1] === "]") {
      setState((state) => ({ ...state, array: JSON.parse(input) }));
    } else return;

    setState((state) => ({
      ...state,
      capacity: state.array.length,
    }));
  };

  const updateResizingFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const parsedInput = parseFloat(input);

    if (input === "" || parsedInput > 1) {
      setResizingFactor(input);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex space-x-2">
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
        <div className="divider divider-primary divider-horizontal "></div>
        <button onClick={pop} className="btn btn-outline">
          Pop
        </button>
      </div>

      {/* Visualization Window */}
      <div className="relative p-4 h-playground w-full flex flex-col justify-center items-center border border-black rounded-md">
        <div className="absolute top-0 left-0 p-3 text-lg">
          <span className="font-bold">Size:</span> {state.size}
          <span className="font-bold ml-4">Capacity:</span> {state.capacity}
        </div>

        <svg className="w-full" ref={svgRef}></svg>
      </div>

      {/* Options */}
      <div className="flex flex-col items-start w-full">
        <h2 className="text-h2 underline font-bold mb-4">Options</h2>

        <div className="w-full flex flex-col space-y-4">
          {/* Array Input */}
          <div className="flex justify-between items-start">
            <h3 className="text-h3 font-bold">Input</h3>
            <textarea
              value={arrInput}
              onChange={updateState}
              className="textarea textarea-bordered textarea-md w-full max-w-md"
              placeholder="Custom Input"
            />
          </div>

          {/* Resizing Factor Input */}
          <div className="flex justify-between items-center">
            <h3 className="text-h3 font-bold">Resizing Factor</h3>
            <input
              type="text"
              value={resizingFactor}
              onChange={updateResizingFactor}
              className="input input-bordered"
              placeholder="Resizing Factor"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicArrayPG;
