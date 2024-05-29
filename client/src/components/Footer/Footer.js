import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

function Footer() {
  const loggedIn = useIsLoggedIn();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <Link to="/" className={styles.logoLink}>
          <GiRunningShoe className={styles.logoIcon} />
        </Link>
      </div>
      <div className={styles.footerLinks}>
        {/* <Link to="/home" className={styles.footerLink}>
          Home
        </Link> */}
        <Link to="/products/men" className={styles.footerLink}>
          MEN
        </Link>
        <Link to="/products/women" className={styles.footerLink}>
          WOMEN
        </Link>
        <Link to="/products/kids" className={styles.footerLink}>
          KIDS
        </Link>
        <Link to="/products" className={styles.footerLink}>
          PRODUCTS
        </Link>
        {loggedIn && (
          <>
            {" "}
            <Link to="/account" className={styles.footerLink}>
              ACOUNT
            </Link>
            <Link to="/account/favorites" className={styles.footerLink}>
              FAVORITES
            </Link>
            <Link to="/account/orders" className={styles.footerLink}>
              ORDERS
            </Link>
          </>
        )}
      </div>
      <div className={styles.socialLinks}>
        <a href="https://www.facebook.com" className={styles.socialLink}>
          <FaFacebookF className={styles.facebook} />
        </a>
        <a href="https://www.twitter.com" className={styles.socialLink}>
          <FaTwitter className={styles.twitter} />
        </a>
        <a href="https://www.instagram.com" className={styles.socialLink}>
          <FaInstagram className={styles.instagram} />
        </a>
      </div>
      <div className={styles.footerTextContainer}>
        <p className={styles.footerText}>
          <a href="mailto:sneakify.support@sneakify.com">
            sneakify.support@sneakify.com
          </a>
        </p>
        <span className={styles.devider}></span>
        <p className={styles.footerText}>
          &copy; 2021 Sneakify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
