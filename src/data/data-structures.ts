import { DataStructure, DataStructureKV } from "../entities";

export const dataStructures: DataStructureKV[] = [
  [
    "dynamic-array",
    {
      name: "Dynamic Array",
      description: "Resizable arrays with dynamic capacity.",
      icon: "🪟",
      category: "Arrays/Strings",
      difficulty: "Beginner",
    },
  ],
  [
    "singly-linked-list",
    {
      name: "Singly Linked List",
      description: "Linear collection with nodes linked in sequence.",
      icon: "🔜",
      category: "Linked Lists",
      difficulty: "Beginner",
    },
  ],
  [
    "doubly-linked-list",
    {
      name: "Double Linked List",
      description: "Nodes linked bi-directionally for efficient traversal.",
      icon: "🔛",
      category: "Linked Lists",
      difficulty: "Beginner",
    },
  ],
  [
    "hash-table",
    {
      name: "Hash Table",
      description: "Key-value pairs for efficient data retrieval.",
      icon: "🧮",
      category: "Arrays/Strings",
      difficulty: "Beginner",
    },
  ],
];

const map: Map<string, DataStructure> = new Map(dataStructures);

export default map;
