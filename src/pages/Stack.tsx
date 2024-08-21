import map from "../data/data-structures";
import Heading from "../components/Heading";
import StackPG from "../components/DSPlaygrounds/StackPG";
// import StackPG from "../components/DSPlaygrounds/StackPG";

function Stack() {
  const stack = map.get("stack")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Headinga */}
        <Heading ds={stack} className="mb-8" />

        {/* Playground */}
        <StackPG />
      </div>
    </div>
  );
}

export default Stack;
