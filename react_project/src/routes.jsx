import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/error-page/error-page.jsx";
import Layout from "./containers/layout/layout.jsx";
import Table from "./containers/table/table.jsx";
import SearchBar from "./containers/search-bar/search-bar.jsx";
import Home from "./containers/home/home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
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
    ]
  }
]);
