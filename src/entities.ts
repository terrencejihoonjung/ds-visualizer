export type DataStructure = {
  name: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  notesUrl: string;
};

export type HashNode = {
  key: number;
  value: string;
  next: HashNode | null;
  highlight: boolean;
};

export type DataStructureKV = [string, DataStructure];

export type DynamicArrayState = {
  array: number[];
  size: number;
  capacity: number;
};

export type PlaygroundProps = {
  className?: string;
};
