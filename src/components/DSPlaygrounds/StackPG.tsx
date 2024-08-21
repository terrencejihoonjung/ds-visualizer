import { useState, useRef, useEffect } from "react";
import { PlaygroundProps } from "../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../Icons/PencilIcon";
import map from "../../data/data-structures";

const MAX_STACK_SIZE = 12; // Increased for demonstration

function StackPG({ className }: PlaygroundProps) {
  const ds = map.get("stack")!;
  const [stack, setStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const stackContainerRef = useRef<HTMLDivElement>(null);

  const push = (element: number) => {
    if (stack.length >= MAX_STACK_SIZE) {
      setErrorMessage(
        `Cannot push: Stack is full (max size: ${MAX_STACK_SIZE})`
      );
      return;
    }
    setStack((prevStack) => [...prevStack, element]);
    setErrorMessage("");
  };

  const pop = () => {
    if (isEmpty()) {
      setErrorMessage("Cannot pop: Stack is empty");
      return;
    }
    setStack((prevStack) => prevStack.slice(0, -1));
    setErrorMessage("");
  };

  const isEmpty = () => stack.length === 0;

  const clear = () => {
    setStack([]);
    setErrorMessage("");
  };

  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }
    push(value);
    setInputValue("");
  };

  useEffect(() => {
    if (stackContainerRef.current) {
      stackContainerRef.current.scrollTop = 0; // Scroll to top after each update
    }
  }, [stack]);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input input-bordered"
            placeholder="Enter a number"
          />
          <button onClick={handlePush} className="btn btn-outline">
            Push
          </button>
          <button onClick={pop} className="btn btn-outline">
            Pop
          </button>
          <button onClick={clear} className="btn btn-outline">
            Clear
          </button>
        </div>
        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Visualization Window */}
      <div className="relative p-4 h-playground w-full flex flex-col justify-center items-center border border-black rounded-md">
        <div className="absolute top-0 left-0 p-3 text-lg flex space-x-4">
          <span className="font-bold">Size: {stack.length}</span>
          <span className="font-bold">
            Is Empty: {isEmpty() ? "Yes" : "No"}
          </span>
        </div>

        <div
          ref={stackContainerRef}
          className="flex flex-col items-center overflow-y-auto max-h-[400px] w-full"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#4A5568 #EDF2F7" }}
        >
          {[...stack].reverse().map((item, index) => (
            <div
              key={index}
              className={`w-32 h-12 border-2 border-primary flex items-center justify-center mb-1
                ${index === 0 ? "bg-yellow-200" : "bg-primary text-white"}`}
            >
              {item}
            </div>
          ))}
          <div className="w-32 h-2 bg-primary mb-1"></div>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col items-start w-full">
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export default StackPG;
