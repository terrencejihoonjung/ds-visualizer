import map from "../data/data-structures";
import Heading from "../components/Heading";
import BinarySearchTreePG from "../components/DSPlaygrounds/BinarySearchTreePG";

function BinarySearchTree() {
  const binarySearchTree = map.get("binary-search-tree")!;

  return (
    <div className="w-full h-screen p-8">
      <div className="w-3/5 mx-auto h-full flex flex-col">
        {/* Heading */}
        <Heading ds={binarySearchTree} className="mb-8" />

        {/* Playground */}
        <BinarySearchTreePG />
      </div>
    </div>
  );
}

export default BinarySearchTree;
