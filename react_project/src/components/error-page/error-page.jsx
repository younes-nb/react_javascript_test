import {Link} from "react-router-dom";
import styles from "./error-page.module.css"
import {Button} from "@mui/material";

export default function ErrorPage() {

  return (
    <div className={styles.notfoundContainer}>
      <div className={styles.notfound}>
        <div className={styles.notfound404}></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
          unavailable</p>
        <Button variant="text" className={styles.back}><Link to="/">Back to homepage</Link></Button>
      </div>
    </div>
  );
}
