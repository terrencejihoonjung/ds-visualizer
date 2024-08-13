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
      notesUrl: "https://dev.to/jihoonj/implementing-dynamic-arrays-5fb5",
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
      notesUrl: "",
    },
  ],
  [
    "doubly-linked-list",
    {
      name: "Doubly Linked List",
      description: "Nodes linked bi-directionally for efficient traversal.",
      icon: "🔛",
      category: "Linked Lists",
      difficulty: "Beginner",
      notesUrl: "",
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
      notesUrl: "",
    },
  ],
];

const map: Map<string, DataStructure> = new Map(dataStructures);

export default map;
