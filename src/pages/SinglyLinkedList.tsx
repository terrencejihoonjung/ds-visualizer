import map from "../data/data-structures";
import Heading from "../components/Heading";

function SinglyLinkedList() {
  const dynamicArray = map.get("singly-linked-list")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Heading */}
        <Heading ds={dynamicArray} className="mb-8" />

        {/* Playground */}
      </div>
    </div>
  );
}

export default SinglyLinkedList;