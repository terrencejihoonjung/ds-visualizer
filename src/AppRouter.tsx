import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DynamicArray from "./pages/DynamicArray";
import Layout from "./Layout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dynamic-array" element={<DynamicArray />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
