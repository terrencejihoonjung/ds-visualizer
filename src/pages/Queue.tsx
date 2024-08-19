import map from "../data/data-structures";
import Heading from "../components/Heading";
// import QueuePG from "../components/DSPlaygrounds/QueuePG";

function Queue() {
  const queue = map.get("queue")!;

  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-3/5 mx-auto">
        {/* Headinga */}
        <Heading ds={queue} className="" />

        {/* Playground */}
      </div>
    </div>
  );
}

export default Queue;
