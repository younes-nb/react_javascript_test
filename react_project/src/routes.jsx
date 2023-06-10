import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/error-page.jsx";
import Layout from "./components/layout/layout.jsx";
import Table from "./components/table/table.jsx";
import SearchBar from "./components/search-bar/search-bar.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/layout",
    element: <Layout/>,
  },
  {
    path: "/table",
    element: <Table/>,
  },
  {
    path: "/searchbar",
    element: <SearchBar/>,
  },
]);
