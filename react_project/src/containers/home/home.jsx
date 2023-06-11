import styles from "./home.module.css";
import {Link} from "react-router-dom";
import logo from "../../assets/react_logo.png"

function Home() {

  return (
    <>
      <div className="container">
        <main className={styles.main}>
          <img src={logo} alt="logo"/>
          <h1>React Interview Test Project</h1>
          <div className={styles.instructions}>
            <ul className={styles.list}>
              <a href="https://github.com/younes-nb/react_javascript_test" target="_blank">Source Code</a>
              <Link to="/layout">Layout</Link>
              <Link to="/table">Table</Link>
              <Link to="/searchbar">Search</Link>
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home;