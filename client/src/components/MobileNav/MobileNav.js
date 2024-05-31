import React, { useState, useEffect, useRef } from "react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { Link } from "react-router-dom";
import styles from "./MobileNav.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

const MobileNav = ({ onClose, active, logout }) => {
  const isLoggedIn = useIsLoggedIn();
  const navRef = useOutsideClick(onClose);

  const handleLogout = async () => {
    const logOutLink = "/logout";

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
      <div
        className={styles.mobileNavList}
        aria-label="Mobile Navigation List"
        onClick={onClose}
      >
        <Link className={styles.mobileNavLink} to="/" aria-label="Home">
          Home
        </Link>

        <Link className={styles.mobileNavLink} to="/men" aria-label="Men">
          Men
        </Link>

        <Link className={styles.mobileNavLink} to="/women" aria-label="Women">
          Women
        </Link>

        <Link className={styles.mobileNavLink} to="/kids" aria-label="Kids">
          Kids
        </Link>

        <Link
          className={styles.mobileNavLink}
          to="/products"
          aria-label="Products"
        >
          Products
        </Link>

        <Link
          className={styles.mobileNavLink}
          to={isLoggedIn ? "/account/userInfo" : "/login"}
          aria-label="Login"
        >
          {isLoggedIn ? "My Account" : "Login"}
        </Link>

        {isLoggedIn && (
          <Link
            className={styles.mobileNavLink}
            to="/"
            aria-label="Logout"
            onClick={handleLogout}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
