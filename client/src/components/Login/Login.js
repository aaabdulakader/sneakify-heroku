import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import loginFormStyles from "./Login.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { Alert } from "../index";

function LoginForm({ setTokenAndUser }) {
  const [showPassword, setShowPassword] = useState(false);
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleShowPassword = () => {
    let passwordInput = document.querySelector("#password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setShowPassword(true);
    } else {
      passwordInput.type = "password";
      setShowPassword(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginLink = "/api/v1/users/login";

    fetch(loginLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // email: "testt@gmail.com",
        // password: "test123",
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.data.user);
          setTokenAndUser(data.token, data.data.user, data.tokenExpiresIn);
          setShowLogin(false);

          // Show success message
          setAlert({ message: data.message, type: "success" });

          // Redirect to home page
          setTimeout(() => {
            if (localStorage.getItem("")) {
              window.location.href = `/products/${
                JSON.parse(localStorage.getItem("currentProduct")).slug
              }`;
            } else {
              window.location.href = "/";
            }
          }, 1000);
        } else {
          // Show error message
          setAlert({ message: data.message, type: "error" });
        }
      });
  };

  return (
    <div className={loginFormStyles.container}>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          className={loginFormStyles.alert}
        />
      )}
      {showLogin && (
        <div className={loginFormStyles.loginContainer}>
          <form className={loginFormStyles.form} onSubmit={handleLogin}>
            <h2 className={loginFormStyles.formTitle}>Login</h2>
            <div className={loginFormStyles.inputContainer}>
              <label htmlFor="email" className={loginFormStyles.inputlabel}>
                Email
                <input
                  className={loginFormStyles.input}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete={"on"}
                  autoFocus={true}
                  required
                />
              </label>
            </div>
            <div className={loginFormStyles.inputContainer}>
              <label htmlFor="password" className={loginFormStyles.inputlabel}>
                Password
                <input
                  className={loginFormStyles.input}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  required
                />
                <div
                  className={loginFormStyles.showPassword}
                  onClick={handleShowPassword}
                >
                  {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                </div>
              </label>
            </div>
            <button type="submit" className={loginFormStyles.submitButton}>
              Login
            </button>
          </form>

          <div className={loginFormStyles.signupContainer}>
            <p>Don't have an account?</p>
            <Link to="/signup" className={loginFormStyles.signupLink}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
