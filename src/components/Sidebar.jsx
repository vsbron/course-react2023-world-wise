import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* Outlet element with the content passed in on App component inside Nested Routes */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
