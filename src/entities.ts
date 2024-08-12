export type DataStructure = {
  name: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

export type DataStructureKV = [string, DataStructure];

export type DynamicArrayState = {
  array: number[];
  size: number;
  capacity: number;
};
