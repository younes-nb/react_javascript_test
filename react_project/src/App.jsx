import Navbar from "./components/navbar/navbar.jsx";
import {Outlet} from "react-router-dom";

function App() {
  return (<>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App;
