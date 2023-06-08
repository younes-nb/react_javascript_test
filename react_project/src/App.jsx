import { Link } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <main className={styles.container}>
        <h1>Steps</h1>
        <ul className={styles.list}>
          <Link to="/layout" className={styles.listItem}>
            2. Layout
          </Link>
          <Link to="/table" className={styles.listItem}>
            3. Table
          </Link>
          <Link to="/searchbar" className={styles.listItem}>
            4. Search bar
          </Link>
        </ul>
      </main>
    </>
  );
}

export default App;
