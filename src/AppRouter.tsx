import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import DynamicArray from "./pages/DynamicArray/DynamicArray";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dynamic-array",
    element: <DynamicArray />,
  },
]);

function AppRouter() {
  return (
    <div className="w-full min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRouter;
