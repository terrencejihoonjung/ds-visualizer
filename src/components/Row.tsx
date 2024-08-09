import { Link } from "react-router-dom";
import { DataStructure } from "../entities";

interface RowProps {
  dataStructure: DataStructure;
}

function Row({ dataStructure }: RowProps) {
  return (
    <Link
      to={`/${dataStructure.name.toLowerCase().split(" ").join("-")}`}
      role="button"
      className="bg-base-200 bg-opacity-0 p-6 border flex justify-between items-center mb-2 hover:bg-opacity-5"
    >
      <div className="flex items-center">
        <div className="text-h1 w-12 h-12 flex items-center justify-center text-white font-bold mr-4">
          {dataStructure.icon}
        </div>
        <div className="flex-grow">
          <h2 className="font-bold">{dataStructure.name}</h2>
          <p className="text-sm text-gray-600">{dataStructure.description}</p>
        </div>
      </div>

      <div className="text-right space-y-2">
        <p className="text-sm text-gray-600">{dataStructure.category}</p>
        <span className="badge badge-md">{dataStructure.difficulty}</span>
      </div>
    </Link>
  );
}

export default Row;
