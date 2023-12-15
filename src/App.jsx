import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import WritingPage from "./pages/WritingPage";
import DetailBoardPage from "./pages/DetailBoardPage";

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
        },
        {
          path:":id",
          element: <DetailBoardPage />,
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
