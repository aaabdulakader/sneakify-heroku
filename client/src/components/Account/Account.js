// Account.jsx
import { React, useState, useEffect } from "react";
// import AccountSidebar from "./AccountSidebar";
import { Favorites, Orders, UserInfo } from "./../index.js";
import styles from "./Account.module.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { BiBox } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Sidebar = () => {
  const current = window.location.pathname.split("/")[2];
  const [selectedTab, setSelectedTab] = useState(
    current === "userInfo"
      ? "userInfo"
      : current === "favorites"
      ? "favorites"
      : "orders"
  );
  const [showTab, setShowTab] = useState(true);

  return (
    <div className={styles.sidebar}>
      <div className={styles.titleWrapper}>
        <FaUser className={styles.userIcon} />
        {showTab && <h2 className={styles.sidebarTitle}>Account</h2>}
      </div>
      <ul className={styles.sidebarList}>
        <li
          className={
            styles.tab + " " + (selectedTab === "userInfo" ? styles.active : "")
          }
          onClick={() => setSelectedTab("userInfo")}
        >
          {showTab && (
            <Link to="/account/userInfo" className={styles.tabLink}>
              <CgProfile className={styles.tabIcon} />
              User info
            </Link>
          )}
        </li>
        <li
          className={
            styles.tab +
            " " +
            (selectedTab === "favorites" ? styles.active : "")
          }
          onClick={() => setSelectedTab("favorites")}
        >
          {showTab && (
            <Link to="/account/favorites" className={styles.tabLink}>
              <MdFavoriteBorder className={styles.tabIcon} />
              Favorites
            </Link>
          )}
        </li>
        <li
          className={
            styles.tab + " " + (selectedTab === "orders" ? styles.active : "")
          }
          onClick={() => setSelectedTab("orders")}
        >
          {showTab && (
            <Link to="/account/orders" className={styles.tabLink}>
              <BiBox className={styles.tabIcon} />
              Orders
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

const Account = () => {
  // get current user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "/login";
  }

  const userId = currentUser._id;

  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:9000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.document);
        return data;
      });
  }, []);

  const [showSidebar, setShowSidebar] = useState(true);
  // get screen width
  const screenWidth = window.innerWidth;
  // redirect to userInfo page by default
  if (window.location.pathname.includes("account")) {
    // window.location.href = "/account/userInfo";
  }

  return (
    <div className={styles.account}>
      {/* <div className={styles.sidebarWrapper}> */}
      <Sidebar />

      <Routes className={styles.content}>
        <Route
          path="userInfo"
          element={<UserInfo user={user} />}
          className={styles.userInfo}
        />
        <Route
          path="favorites"
          element={<Favorites />}
          className={styles.favorites}
        />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
};


export default Account;
