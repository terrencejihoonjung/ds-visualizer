import { useState, useEffect } from "react";
import { PlaygroundProps } from "../../entities";
import { Link } from "react-router-dom";
import PencilIcon from "../Icons/PencilIcon";
import map from "../../data/data-structures";
import { HashNode } from "../../entities";

const MAX_BUCKETS = 16;
const MAX_NODES_PER_BUCKET = 8;

function HashTablePG({ className }: PlaygroundProps) {
  // Initialize State
  const ds = map.get("hash-table")!;
  const [capacity, setCapacity] = useState(4); // Capacity
  const [size, setSize] = useState(0); // Size

  // Buckets (each bucket will contain a hash node or null)
  const [buckets, setBuckets] = useState<(HashNode | null)[]>(
    new Array(capacity).fill(null)
  );

  const [keyInput, setKeyInput] = useState(""); // Key Input (Set)
  const [valueInput, setValueInput] = useState(""); // Value Input (Set)
  const [removeInput, setRemoveInput] = useState(""); // Key Input (Removal)
  const [getInput, setGetInput] = useState(""); // Key Input (Get)
  const [errorMessage, setErrorMessage] = useState(""); // Error Message
  const [resizeThreshold, setResizeThreshold] = useState(0.75); // Resize Threshold

  //   Whenever size, capacity, or threshold changes, check to see if resizing is necessary
  useEffect(() => {
    if (size / capacity >= resizeThreshold) {
      resize();
    }
  }, [size, capacity, resizeThreshold]);

  // Hash Function
  const hash = (key: number) => key % capacity;

  // Insert Key-Value Pair
  const insert = (key: number, value: string) => {
    // 1. Obtain Hash Code from Key
    const index = hash(key);
    const newNode: HashNode = { key, value, next: null, highlight: false };

    /* 
    2. Modify buckets state to include new node 
    - Case 1: Key-Value is first node in bucket and added as first node
    - Case 2: Key-Value already exists
    - Case 3: Key-Value is inserted at end of linked list
    */
    const newBuckets = [...buckets]; // Previous Buckets State

    // Case 1
    if (!newBuckets[index]) {
      newBuckets[index] = newNode;
      setSize((prev) => prev + 1);
    }

    // Viist Linked List at Bucket
    else {
      let currentNode = newBuckets[index];
      let nodeCount = 1;
      let keyExists = false;

      // Iterate through linked list and check if key-value pair exists
      while (currentNode!.next && nodeCount < MAX_NODES_PER_BUCKET) {
        // Case 2
        if (currentNode!.key === key) {
          currentNode!.value = value;
          keyExists = true;
        }
        currentNode = currentNode!.next;
        nodeCount++;
      }

      // Case 2/3
      if (!keyExists) {
        if (nodeCount < MAX_NODES_PER_BUCKET) {
          // Case 2 (for last node)
          if (currentNode!.key === key) {
            currentNode!.value = value;
          }

          // Case 3
          else {
            currentNode!.next = newNode;
            setSize((prev) => prev + 1); // Update size
          }
        }

        // Handle Error When Linked List's Length Reaches Limit
        else {
          setErrorMessage(
            `Bucket at index ${index} is full. Cannot insert more nodes.`
          );
        }
      }
    }

    setBuckets(newBuckets);
  };

  // Remove Key-Value Pair
  const remove = (key: number) => {
    const index = hash(key); // Get Hash from Key

    // Key-Value doesn't Exist
    if (!buckets[index]) return false;
    const newBuckets = [...buckets];

    // Remove Head if Key-Value is First Node
    if (newBuckets[index]!.key === key) {
      newBuckets[index] = newBuckets[index]!.next;
      setSize((prevSize) => prevSize - 1);
      setBuckets(newBuckets);
      return true;
    }

    // Find and Remove Key-Value in Linked List
    let currentNode = newBuckets[index];
    while (currentNode!.next) {
      if (currentNode!.next.key === key) {
        currentNode!.next = currentNode!.next.next;
        setSize((prevSize) => prevSize - 1);
        break;
      }
      currentNode = currentNode!.next;
    }

    setBuckets(newBuckets);
    return true;
  };

  // Get Key-Value Pair and Highlight It
  const get = (key: number): string | undefined => {
    let value: string | null = null;

    /* 
    Go through each bucket and look for the key-value pair
    - Case 1: Found Key-Value Pair -> highlight it and unhighlight everything else
    - Case 2: Did not find key-value pair -> Display Error Message (handled by handleGet function)
    */
    const newBuckets = buckets.map((bucket) => {
      if (bucket) {
        let curr: HashNode | null = bucket;
        const newHead = curr;

        while (curr) {
          // Case 1
          if (curr.key === key) {
            value = curr.value;
            curr.highlight = true;
          } else {
            curr.highlight = false;
          }

          curr.next = curr.next ? curr.next : null;
          curr = curr.next;
        }
        return newHead;
      }
      return bucket;
    });

    setBuckets(newBuckets);

    // Case 2
    return value ?? undefined;
  };

  // Resize Hash Table
  const resize = () => {
    // display error when max allowed buckets is exceeded.
    if (capacity >= MAX_BUCKETS) {
      setErrorMessage(
        `Cannot resize: Maximum number of buckets (${MAX_BUCKETS}) reached.`
      );
      return;
    }

    // Initialize new capacity and buckets
    const newCapacity = Math.min(capacity * 2, MAX_BUCKETS);
    const newBuckets: (HashNode | null)[] = new Array(newCapacity).fill(null);

    // rehash + map items in previous buckets into new buckets
    buckets.forEach((head) => {
      let currentNode = head;
      while (currentNode) {
        const newIndex = currentNode.key % newCapacity; // rehashing
        const next = currentNode.next;

        // adding to the head of newBuckets[newIndex]
        currentNode.next = newBuckets[newIndex];
        newBuckets[newIndex] = currentNode;

        currentNode = next;
      }
    });
    setBuckets(newBuckets);
    setCapacity(newCapacity);
  };

  // Handle Set Action
  const handleSet = () => {
    const key = parseInt(keyInput);
    if (isNaN(key)) {
      setErrorMessage("Please enter a valid number for the key");
      return;
    }
    if (valueInput.trim() === "") {
      setErrorMessage("Please enter a non-empty value");
      return;
    }
    insert(key, valueInput);
    setKeyInput("");
    setValueInput("");
    setErrorMessage("");
  };

  //   Handle Remove Action
  const handleRemove = () => {
    const key = parseInt(removeInput);
    if (isNaN(key)) {
      setErrorMessage("Please enter a valid number for the key");
      return;
    }
    const removed = remove(key);
    if (removed) {
      setRemoveInput("");
      setErrorMessage("");
    } else {
      setErrorMessage("Key not found");
    }
  };

  // Handle Get Action
  const handleGet = () => {
    const key = parseInt(getInput);

    // get input is not valid number
    if (isNaN(key)) {
      setErrorMessage("Please enter a valid number for the key");
      return;
    }

    const value = get(key);

    // key-value pair not found in buckets
    if (value === undefined) {
      setErrorMessage("Key not found");
    } else {
      setErrorMessage("");
    }
  };

  //   Reset Hash Table
  const handleReset = () => {
    setCapacity(4);
    setSize(0);
    setBuckets(new Array(4).fill(null));
    setKeyInput("");
    setValueInput("");
    setRemoveInput("");
    setGetInput("");
    setErrorMessage("");
    setResizeThreshold(0.75);
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Main Action */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="input input-bordered"
            placeholder="Key"
          />
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="input input-bordered"
            placeholder="Value"
          />
          <button onClick={handleSet} className="btn btn-outline">
            Set (Hash: {keyInput ? hash(parseInt(keyInput)) : "?"})
          </button>
          <button onClick={handleReset} className="btn btn-outline">
            Reset
          </button>
        </div>

        <Link to={ds.notesUrl} className="btn btn-outline">
          <PencilIcon /> <p>Notes</p>
        </Link>
      </div>

      {/* Visualization Window  */}
      <div className="overflow-hidden relative px-4 pb-4 pt-12 h-playground w-full flex flex-col justify-center items-center border border-black rounded-md">
        <div className="absolute top-0 left-0 p-3 text-lg">
          <span className="font-bold">Size:</span>
          <span data-testid="size">{size}</span>
          <span className="font-bold ml-4">Capacity:</span>
          <span data-testid="capacity">{capacity}</span>
          <span className="font-bold ml-4">Load Factor:</span>
          <span data-testid="loadFactor">{(size / capacity).toFixed(2)}</span>
        </div>

        <div className="overflow-auto w-full">
          {buckets.map((bucket, index) => (
            <div key={index} className="flex items-center my-1">
              <div className="w-10 h-10 bg-primary text-base-100 flex items-center justify-center mr-2">
                {index}
              </div>
              {bucket ? (
                <div className="flex items-center">
                  {(() => {
                    const nodes = [];
                    let currentNode: HashNode | null = bucket;
                    while (currentNode) {
                      nodes.push(
                        <div
                          key={currentNode.key}
                          className="flex items-center"
                        >
                          <div
                            className={`${
                              currentNode.highlight
                                ? "bg-yellow-500 text-primary"
                                : "bg-primary"
                            } text-white p-2 rounded`}
                          >
                            {currentNode.key}:{currentNode.value}
                          </div>
                          {currentNode.next && <div className="mx-1">→</div>}
                        </div>
                      );
                      currentNode = currentNode.next;
                    }
                    return nodes;
                  })()}
                </div>
              ) : (
                <div className="text-primary opacity-50">Empty</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col items-start w-full">
        <h2 className="text-h2 underline font-bold mb-4">Options</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <div className="w-full flex flex-col space-y-4">
          {/* GET */}
          <div className="flex justify-between items-center">
            <h3 className="text-h3 font-bold">Get</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={getInput}
                onChange={(e) => setGetInput(e.target.value)}
                className="input input-bordered"
                placeholder="Key"
              />
              <button onClick={handleGet} className="btn btn-outline">
                Get
              </button>
            </div>
          </div>

          {/* REMOVE */}
          <div className="flex justify-between items-center">
            <h3 className="text-h3 font-bold">Remove</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={removeInput}
                onChange={(e) => setRemoveInput(e.target.value)}
                className="input input-bordered"
                placeholder="Key"
              />
              <button onClick={handleRemove} className="btn btn-outline">
                Remove
              </button>
            </div>
          </div>

          {/*  RESIZE THRESHOLD*/}
          <div className="flex justify-between items-center">
            <h3 className="text-h3 font-bold">Resize Threshold</h3>
            <input
              type="number"
              value={resizeThreshold}
              onChange={(e) => setResizeThreshold(parseFloat(e.target.value))}
              className="input input-bordered"
              step="0.05"
              min="0"
              max="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HashTablePG;
