import { React, useState } from "react";
import { IoMdMailUnread } from "react-icons/io";
import { BsSendCheckFill } from "react-icons/bs";
import { ThreeDots } from "react-loading-icons";

import styles from "./Newsletter.module.css";

function Newsletter() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <section className={styles.newsletter}>
      <h2 className={styles.newsletterTitle}>Subscribe to our newsletter</h2>
      <div className={styles.newsletterContainer}>
        {sent && (
          <BsSendCheckFill
            className={styles.newsletterIcon + " " + styles.sent}
          />
        )}
        {loading && (
          <ThreeDots className={styles.newsletterIcon + " " + styles.loading} />
        )}
        {!sent && !loading && (
          <IoMdMailUnread className={styles.newsletterIcon} />
        )}
        <div className={styles.newsletterTextContainer}>
          <p className={styles.newsletterText}>
            {sent
              ? "Thank you for subscribing"
              : `Get the latest news and offers`}
          </p>
        </div>
        {!sent && (
          <form action="" className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button
              type="submit"
              className={styles.newsletterButton}
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setSent(true);
                }, 2000);
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
