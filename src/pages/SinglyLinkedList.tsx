import map from "../data/data-structures";
import Heading from "../components/Heading";
import SinglyLinkedListPG from "../components/DSPlaygrounds/SinglyLinkedListPG";

function SinglyLinkedList() {
  const singlyLinkedList = map.get("singly-linked-list")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Heading */}
        <Heading ds={singlyLinkedList} className="mb-8" />

        {/* Playground */}
        <SinglyLinkedListPG />
      </div>
    </div>
  );
}

export default SinglyLinkedList;
