import BackButton from "./BackButton";
import Badge from "./Badge";
import { DataStructure } from "../entities";

type HeadingProps = {
  ds: DataStructure;
  className?: string;
};

function Heading({ ds, className }: HeadingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-4">
        <BackButton />
      </div>
      <div>
        <h1 className="text-h1 font-bold">{ds.name}</h1>
        <Badge text={ds.difficulty} />
      </div>
    </div>
  );
}

export default Heading;
