import { React, useRef, useState, useEffect } from "react";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

import styles from "./Header.module.css";
import { MobileNav } from "../index.js";
import { SearchProduct } from "../index.js";

// icons
import { BsCart3 } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
import useFetch from "../../hooks/useFetch";

// hooks
import useOutsideClick from "../../hooks/useOutsideClick";

const ProfileDropdown = ({ logout, setDropdown }) => {
  return (
    <div>
      <Link
        to="/account/userInfo"
        area-label="Account"
        onClick={() => setDropdown(false)}
      >
        Account
      </Link>
      <Link
        to="/account/orders"
        area-label="Orders"
        onClick={() => setDropdown(false)}
      >
        Orders
      </Link>
      <Link
        to="/account/favorites"
        area-label="Favorites"
        onClick={() => setDropdown(false)}
      >
        Favorites
      </Link>
      <Link to="/logout" area-label="Logout" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

function Header({ logout }) {
  // States
  const isLoggedIn = useIsLoggedIn();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let cart = JSON.parse(localStorage.getItem("cart"));
  const count = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const { data } = useFetch("/api/v1/products/");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.documents);
    }
  }, [data]);

  useEffect(() => {
    if (searchValue === "") {
      setSearchResults([]);

      return;
    }
    console.log("Search Value", searchValue);
    const results = products.filter((product) =>
      product.title.toLowerCase().match(searchValue.toLowerCase())
    );
    console.log("Results", results);
    setSearchResults(results);
  }, [searchValue, products]);

  const dropdownRef = useOutsideClick(() => setShowProfileDropdown(false));
  const searchRef = useOutsideClick(() => setSearchActive(false));

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" area-label="Home">
          <GiRunningShoe className={styles.logo} />
        </Link>
        <nav className={styles.nav + " mobileMenu"} area-label="Navigation">
          <ul className={styles.navList}>
            <li>
              <Link className={styles.navLink} to="/" area-label="Home">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/men" area-label="Men">
                Men
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/women" area-label="Women">
                Women
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} to="/kids" area-label="Kids">
                Kids
              </Link>
            </li>
            <li>
              <Link
                className={styles.navLink}
                to="/products"
                area-label="Products"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
        {/* Login link or Profile Icon */}
        <div className={styles.rightNav} area-label="Right Navigation">
          {/* Search */}
          <div
            styles={{ display: searchActive ? "block" : "none" }}
            className={
              styles.searchBox +
              " " +
              (searchActive && searchValue !== "" && styles.searchActive)
            }
            area-label="Search"
            ref={searchRef}
          >
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              id="search"
              onChange={(e) => {
                setSearchValue(e.target.value);
                searchValue !== ""
                  ? setSearchActive(true)
                  : setSearchActive(false);
              }}
            />

            {searchActive && searchResults.length > 0 && searchValue !== "" && (
              <div
                className={styles.searchResults}
                area-label="Search Results"
                onClick={() => setSearchActive(false)}
              >
                {searchResults.map(
                  (product, i) =>
                    i < 5 && (
                      <SearchProduct key={product._id} product={product} />
                    )
                )}
              </div>
            )}

            {/* <IoIosSearch className={styles.searchIcon} /> */}
          </div>
          {isLoggedIn ? (
            <Link area-label="Profile">
              <RiAccountCircleLine
                className={styles.profileIcon}
                onClick={() => handleDropdown()}
                // onMouseLeave={() => handleDropdown()}
              />
            </Link>
          ) : (
            <Link className={styles.navLink} to="/login">
              Login
            </Link>
          )}

          <Link className={styles.cartIcon} to="/cart" area-label="Cart">
            <BsCart3 className={styles.cartLogo} />
            {count !== 0 && <span className={styles.cartCount}>{count}</span>}
          </Link>

          {isMobileMenuOpen ? (
            <IoCloseOutline
              onClick={toggleMobileMenu}
              className={styles.menuIconClose}
            />
          ) : (
            <IoMenuOutline
              onClick={toggleMobileMenu}
              className={styles.menuIcon}
            />
          )}

          {/* Mobile nav */}
          {
            // if mobile menu is open, show mobile nav
            isMobileMenuOpen && (
              <MobileNav
                onClose={toggleMobileMenu}
                active={isMobileMenuOpen}
                logout={logout}
              />
            )
          }
        </div>

        {showProfileDropdown && (
          <div ref={dropdownRef} className={styles.profileDropdown}>
            <ProfileDropdown
              logout={logout}
              setDropdown={setShowProfileDropdown}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
