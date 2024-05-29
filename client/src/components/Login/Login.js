import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import loginFormStyles from "./Login.module.css";
import jwt_decode from "jwt-decode";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";

import { Alert } from "../index";

function LoginForm({ setTokenAndUser }) {
  const [showPassword, setShowPassword] = useState(false);
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
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

  // const setTokenAndUser = (token, user) => {
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("currentUser", JSON.stringify(user));
  //   // localStorage.setItem("currentUser", user);
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    const loginLink = "http://localhost:9000/users/login";

    fetch(loginLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin1@example.com",
        password: "admin123",
        // email: email,
        // password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.data.user);
          setTokenAndUser(data.token, data.data.user, data.tokenExpiresIn);
          // Redirect to home page

          // Show success message
          setAlert({ message: data.message, type: "success" });

          // console.log("currentProduct", localStorage.getItem("currentProduct"));
          setTimeout(() => {
            if (localStorage.getItem("")) {
              window.location.href = `/products/${
                JSON.parse(localStorage.getItem("currentProduct")).slug
              }`;
            } else {
              window.location.href = "/";
            }
          }, 1500);
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
      <div className={loginFormStyles.loginContainer}>
        <form className={loginFormStyles.form} onSubmit={handleLogin}>
          {/* <Link to="/" area-label="Home">
          <GiRunningShoe className={loginFormStyles.logo} />
        </Link> */}
          <h2 className={loginFormStyles.formTitle}>Login</h2>
          <div className={loginFormStyles.inputContainer}>
            <label htmlFor="email" className={loginFormStyles.inputlabel}>
              Email
              <input
                className={loginFormStyles.input}
                type="text"
                id="email"
                name="email"
                // value="user@example.com"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={"on"}
                autoFocus={true}
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
                // value="password1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
                // required
              />
              <div
                className={loginFormStyles.showPassword}
                onClick={handleShowPassword}
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </div>
            </label>
          </div>
          {/* Forgot Password and Signup Links */}

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

        {/* <div className={loginFormStyles.forgotPasswordContainer}>
        <Link
          to="/forgotpassword"
          className={loginFormStyles.forgotPasswordLink}
        >
          Forgot Password?
        </Link>
      </div> */}
      </div>
    </div>
  );
}

export default LoginForm;
