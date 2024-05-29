import React from "react";
import { Link } from "react-router-dom";

import styles from "./ShopCategory.module.css";

function ShopCategory() {
  return (
    <section className={styles.shopCategoriesSection}>
      {/* <Link to="/men"> */}
      <h2 className={styles.sectionTitle}>Shop by Category</h2>
      <div className={styles.shopCategories}>
        <div
          className={styles.shopCategory}
          onClick={() => (window.location.href = "/men")}
        >
          <h3 className={styles.shopCategoryTitle}>Men</h3>
        </div>
        {/* </Link> */}
        <div
          className={styles.shopCategory}
          onClick={() => (window.location.href = "/women")}
        >
          <h3 className={styles.shopCategoryTitle}>Women</h3>
        </div>
        <div
          className={styles.shopCategory}
          onClick={() => (window.location.href = "/kids")}
        >
          <h3 className={styles.shopCategoryTitle}>Kids</h3>
        </div>
      </div>
    </section>
  );
}

export default ShopCategory;
