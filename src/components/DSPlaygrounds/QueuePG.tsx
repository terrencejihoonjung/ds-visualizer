import { useState } from "react";
import { PlaygroundProps } from "../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../Icons/PencilIcon";
import map from "../../data/data-structures";

const MAX_QUEUE_SIZE = 12;

interface QueueNode {
  data: number;
  next: QueueNode | null;
}

function QueuePG({ className }: PlaygroundProps) {
  const ds = map.get("queue")!;
  const [queue, setQueue] = useState<QueueNode | null>(null);
  const [size, setSize] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const enqueue = (element: number) => {
    if (size >= MAX_QUEUE_SIZE) {
      setErrorMessage(
        `Cannot enqueue: Queue is full (max size: ${MAX_QUEUE_SIZE})`
      );
      return;
    }
    const newNode: QueueNode = { data: element, next: null };
    if (isEmpty()) {
      setQueue(newNode);
    } else {
      let current = queue;
      while (current!.next) {
        current = current!.next;
      }
      current!.next = newNode;
    }
    setSize(size + 1);
    setErrorMessage("");
  };

  const dequeue = () => {
    if (isEmpty()) {
      setErrorMessage("Cannot dequeue: Queue is empty");
      return;
    }
    const removedData = queue!.data;
    setQueue(queue!.next);
    setSize(size - 1);
    setErrorMessage(`Dequeued: ${removedData}`);
  };

  const isEmpty = () => size === 0;

  const clear = () => {
    setQueue(null);
    setSize(0);
    setErrorMessage("");
  };

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setErrorMessage("Please enter a valid number");
      return;
    }
    enqueue(value);
    setInputValue("");
  };

  const getQueueArray = (): number[] => {
    const arr: number[] = [];
    let current = queue;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  };

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
            data-testid="num-input"
          />
          <button onClick={handleEnqueue} className="btn btn-outline">
            Enqueue
          </button>
          <button onClick={dequeue} className="btn btn-outline">
            Dequeue
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
          <span className="font-bold">Size: </span>
          <span data-testid="size">{size}</span>
          <span className="font-bold">Is Empty: </span>
          <span data-testid="is-empty">{isEmpty() ? "Yes" : "No"}</span>
        </div>

        <div className="flex items-center space-x-2">
          {getQueueArray().map((item, index) => (
            <div
              key={index}
              className={`w-12 h-12 border-2 border-primary flex items-center justify-center 
                ${
                  index === 0
                    ? "bg-yellow-200"
                    : index === size - 1
                    ? "bg-green-200"
                    : "bg-primary text-white"
                }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm">
          <span className="mr-4">🟨 Front</span>
          <span>🟩 Back</span>
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

export default QueuePG;
