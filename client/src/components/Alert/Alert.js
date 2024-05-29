import React from "react";

import styles from "./Alert.module.css";

function Alert({ message, type }) {
  return (
    <div className={`${styles.main_alert} ${styles[type]}`}>{message}</div>
  );
}

export default Alert;
