import { DataStructure, DataStructureKV } from "../entities";

export const dataStructures: DataStructureKV[] = [
  [
    "dynamic-array",
    {
      name: "Dynamic Array",
      description: "Resizable arrays with dynamic capacity",
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
      description: "Linear collection with nodes linked in sequence",
      icon: "🔜",
      category: "Linked Lists",
      difficulty: "Beginner",
      notesUrl: "https://dev.to/jihoonj/implementing-a-singly-linked-list-3508",
    },
  ],
  [
    "doubly-linked-list",
    {
      name: "Doubly Linked List",
      description: "Nodes linked bi-directionally for efficient traversal",
      icon: "🔛",
      category: "Linked Lists",
      difficulty: "Beginner",
      notesUrl: "https://dev.to/jihoonj/implementing-a-doubly-linked-list-3mlf",
    },
  ],
  [
    "hash-table",
    {
      name: "Hash Table",
      description: "Key-value pairs for efficient data retrieval",
      icon: "🧮",
      category: "Hashing",
      difficulty: "Beginner",
      notesUrl: "https://dev.to/jihoonj/implementing-a-hash-table-3pa7",
    },
  ],
  [
    "stack",
    {
      name: "Stack",
      description: "Last-In-First-Out (LIFO) data structure",
      icon: "🥞",
      category: "Stack",
      difficulty: "Beginner",
      notesUrl:
        "https://dev.to/jihoonj/lifo-or-fifo-guide-to-stacksqueues-2lf1",
    },
  ],
  [
    "queue",
    {
      name: "Queue",
      description: "First-In-First-Out (FIFO) data structure",
      icon: "⏱️",
      category: "Queue",
      difficulty: "Beginner",
      notesUrl:
        "https://dev.to/jihoonj/lifo-or-fifo-guide-to-stacksqueues-2lf1",
    },
  ],
  [
    "binary-search-tree",
    {
      name: "Binary Search Tree",
      description:
        "A binary tree where left child < parent < right child for all nodes",
      icon: "🌲",
      category: "Tree",
      difficulty: "Intermediate",
      notesUrl: "https://dev.to/jihoonj/trees-101-binary-heaps-tries-2ag8",
    },
  ],
  [
    "heap",
    {
      name: "Min/Max Heap",
      description:
        "A complete binary tree where parent is always smaller or larger than its children",
      icon: "🪣",
      category: "Tree",
      difficulty: "Intermediate",
      notesUrl: "https://dev.to/jihoonj/trees-101-binary-heaps-tries-2ag8",
    },
  ],
];

const map: Map<string, DataStructure> = new Map(dataStructures);

export default map;
