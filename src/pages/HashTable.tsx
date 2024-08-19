import map from "../data/data-structures";
import Heading from "../components/Heading";
import HashTablePG from "../components/DSPlaygrounds/HashTablePG";

function HashTable() {
  const hashTable = map.get("hash-table")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Headinga */}
        <Heading ds={hashTable} className="" />

        <p className="my-4 py-3 italic">
          Note: this implementation utilizes{" "}
          <span className="font-bold">chaining</span> for collision resolution.
        </p>

        {/* Playground */}
        <HashTablePG />
      </div>
    </div>
  );
}

export default HashTable;
