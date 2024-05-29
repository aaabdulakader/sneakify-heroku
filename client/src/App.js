import "./App.css";
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Home,
  Header,
  ProductList,
  Login,
  Account,
  Signup,
  ProductDetail,
  Cart,
  Checkout,
  Alert,
  Footer,
  // Sidebar,
} from "./components/index.js";

const setTokenAndUser = (token, user, expiration) => {
  // Set token and user data in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("currentUser", JSON.stringify(user));
  // Set token in cookie with expiration time
  document.cookie = `jwt=${token}; path=/; max-age=${expiration}`;

  // Store expiration time in sessionStorage
  sessionStorage.setItem("tokenExpiration", Date.now() + expiration * 1000);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([{}]);

  const isUserLoggedIn = () => {
    // check the presence of a cookie named jwt
    const token = document.cookie;
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    // Clear the cookie
    document.cookie = "jwt=; path=/; max-age=0";

    setIsLoggedIn(false);

    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="App">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          logout={logout}
          setCart={setCart}
          cart={cart}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/men" element={<ProductList gender="men" />} />
          <Route exact path="/women" element={<ProductList gender="women" />} />
          <Route exact path="/kids" element={<ProductList gender="kids" />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/products/:slug" element={<ProductDetail />} />
          <Route
            exact
            path="/login"
            element={<Login setTokenAndUser={setTokenAndUser} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup setTokenAndUser={setTokenAndUser} />}
          />
          <Route exact path="/account/*" element={<Account />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
