import React, { useState, useEffect, useRef } from "react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { Link } from "react-router-dom";
import styles from "./MobileNav.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

const MobileNav = ({ onClose, active, logout }) => {
  const isLoggedIn = useIsLoggedIn();
  const navRef = useOutsideClick(onClose);

  const handleLogout = async () => {
    const logOutLink = "http://localhost:9000/logout";

    try {
      const response = await fetch(logOutLink, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        logout();
      } else {
        alert("Error logging out");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out");
    }
  };

  return (
    <nav
      ref={navRef}
      className={styles.mobileNav}
      aria-label="Mobile Navigation"
    >
      <ul
        className={styles.mobileNavList}
        aria-label="Mobile Navigation List"
        onClick={onClose}
      >
        <li>
          <Link className={styles.mobileNavLink} to="/" aria-label="Home">
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/men" aria-label="Men">
            Men
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/women" aria-label="Women">
            Women
          </Link>
        </li>
        <li>
          <Link className={styles.mobileNavLink} to="/kids" aria-label="Kids">
            Kids
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileNavLink}
            to="/products"
            aria-label="Products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={styles.mobileNavLink}
            to={isLoggedIn ? "/account/userInfo" : "/login"}
            aria-label="Login"
          >
            {isLoggedIn ? "My Account" : "Login"}
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link
              className={styles.mobileNavLink}
              to="/"
              aria-label="Logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
