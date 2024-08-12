import map from "../data/data-structures";
import Heading from "../components/Heading";
import DynamicArrayPG from "../components/DSPlaygrounds/DynamicArrayPG";

function DynamicArray() {
  const dynamicArray = map.get("dynamic-array")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Heading */}
        <Heading ds={dynamicArray} className="mb-8" />

        {/* Playground */}
        <DynamicArrayPG />
      </div>
    </div>
  );
}

export default DynamicArray;
