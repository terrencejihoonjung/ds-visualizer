import dataStructures from "../../data/data-structures";
import Row from "./Row";

function Home() {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* top heading */}
        <header className="mb-36">
          <h1 className="text-h1 font-bold mb-1">ds-visualizer</h1>
          <h1 className="text-h5 font-regular mb-2">for the visual learners</h1>
        </header>

        {/* list heading */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-base-100 text-small p-2 border border-1-neutral">
              Count · {dataStructures.length}
            </div>
          </div>

          {/* list */}
          <div className="">
            {dataStructures.map((dataStructure) => {
              return (
                <Row key={dataStructure.name} dataStructure={dataStructure} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
