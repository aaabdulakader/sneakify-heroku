import { React, useState, useEffect } from "react";

import styles from "./UserInfo.module.css";

function UserInfo({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState(user.password);

  //  to update the form fields with the user data
  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const link = "http://localhost:9000/users/";

    fetch(link + user._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.userInfo}>
      <h2 className={styles.title}>Profile</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.subTitle}>Personal Information</h3>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
            <input
              type="text"
              id="firstName"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
            <input
              type="text"
              id="lastName"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="phone" className={styles.label}>
            Phone
            <input
              type="text"
              id="phone"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        {/* <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
            <input type="password" id="password" className={styles.input} />
          </label>
        </div> */}
        <button type="submit" className={styles.submitBtn}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
