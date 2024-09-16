import map from "../data/data-structures";
import Heading from "../components/Heading";
import HeapPG from "../components/DSPlaygrounds/Heap/HeapPG";

function Heap() {
  const heap = map.get("heap")!;

  return (
    <div className="w-full h-screen p-8">
      <div className="w-3/5 mx-auto h-full flex flex-col">
        {/* Heading */}
        <Heading ds={heap} className="mb-8" />

        {/* Playground */}
        <HeapPG />
      </div>
    </div>
  );
}

export default Heap;
