import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import WritingPage from "./pages/WritingPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children : [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "writing",
          element: <WritingPage />,
        }
      ],
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
