import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./components/layout/layout";
import Table from "./components/table/table";
import SearchBar from "./components/search-bar/search-bar";
import ErrorPage from "./components/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/table",
    element: <Table />,
  },
  {
    path: "/searchbar",
    element: <SearchBar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
