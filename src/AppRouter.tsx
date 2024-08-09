import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import DynamicArray from "./pages/DynamicArray";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dynamic-array",
        element: <DynamicArray />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
