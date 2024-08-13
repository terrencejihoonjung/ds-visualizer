import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DynamicArray from "./pages/DynamicArray";
import Layout from "./Layout";
import SinglyLinkedList from "./pages/SinglyLinkedList";
import DoublyLinkedList from "./pages/DoublyLinkedList";
import HashTable from "./pages/HashTable";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dynamic-array" element={<DynamicArray />} />
        <Route path="singly-linked-list" element={<SinglyLinkedList />} />
        <Route path="doubly-linked-list" element={<DoublyLinkedList />} />
        <Route path="hash-table" element={<HashTable />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
