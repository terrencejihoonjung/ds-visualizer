import map from "../data/data-structures";
import Heading from "../components/Heading";
import DoublyLinkedListPG from "../components/DSPlaygrounds/DoublyLinkedListPG";

function DoublyLinkedList() {
  const doublyLinkedList = map.get("doubly-linked-list")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Heading */}
        <Heading ds={doublyLinkedList} className="mb-8" />

        {/* Playground */}
        <DoublyLinkedListPG />
      </div>
    </div>
  );
}

export default DoublyLinkedList;
