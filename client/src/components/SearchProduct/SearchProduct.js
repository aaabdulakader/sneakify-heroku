import React from "react";
import { Link } from "react-router-dom";

import styles from "./SearchProduct.module.css";

function SearchProduct({ product }) {
  return (
    <Link to={`/products/` + product.slug} className={styles.productCard}>
      <img
        src={product.stageImage}
        alt={product.title}
        className={styles.img}
      />
      <p className={styles.productTitle}>{product.title}</p>
      <p className={styles.subTitle}>{product.subTitle}</p>
      <p className={styles.price}>${product.price}</p>
    </Link>
  );
}

export default SearchProduct;
