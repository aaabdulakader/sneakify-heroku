import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Signup.module.css";

function Signup({ setTokenAndUser }) {
  // fname, lname, email, password, confirmPassword
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const signupLink = "http://localhost:9000/users/signup";

    fetch(signupLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: fname,
        lastName: lname,
        passwordConfirm: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          // Redirect to user account page
          console.log(data);
          setTokenAndUser(data.token, data.data.user, data.tokenExpiresIn);
          window.location.href = "/products";
        } else {
          // Display error message
          alert(data.error);
        }
      });

    console.log(email);
    console.log(password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <form className={styles.form} onSubmit={handleSignup}>
          {/* <Link to="/" area-label="Home">
          <GiRunningShoe className={signupStyles.logo} />
        </Link> */}
          <h2 className={styles.formTitle}>Sign Up</h2>

          <div className={styles.nameContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="firstName">
                First Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={(e) => setFname(e.target.value)}
                required
                autoComplete="on"
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel} htmlFor="lastName">
                Last Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={(e) => setLname(e.target.value)}
                required
                autoComplete="on"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="on"
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor="confrimPassword">
              Confirm Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="on"
            />
          </div>
          {/* Forgot Password and Signup Links */}

          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <div className={styles.signupContainer}>
          <p>Already have an account?</p>
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </div>

        {/* <div className={styles.forgotPasswordContainer}>
        <Link
          to="/forgotpassword"
          className={styles.forgotPasswordLink}
        >
          Forgot Password?
        </Link>
      </div> */}
      </div>
    </div>
  );
}

export default Signup;
