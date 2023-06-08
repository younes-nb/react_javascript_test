import styles from "./App.module.css";
import react_logo from "./assets/react_logo.png";

function App() {
  return (
    <main className={styles.main}>
      <img src={react_logo} />
      <h1>Project Template</h1>
      <div className={styles.instructions}>
        <div>
          <p>Installed: React Router, React Query</p>
          <p>
            Add any additional packages you need to the json file when
            installing.
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
