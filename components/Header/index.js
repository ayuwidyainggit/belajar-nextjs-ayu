import WithAuth from "../WithAuth";
import styles from "./styles.module.css";

function Header() {
  return <div className={styles.header}>Header</div>;
}

export default WithAuth(Header);
