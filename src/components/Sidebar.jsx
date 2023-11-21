import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";

import styles from "./Sidebar.module.css";

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
