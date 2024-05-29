import React from "react";
import Product from "../Product/Product";

import styles from "./FeaturedProducts.module.css";

function FeaturedProducts({ products }) {
  return (
    <div className={styles.featuredProducts}>
      <h2 className={styles.sectionTitle}>Featured Products</h2>
      <div className={styles.products}>
        {products.map(
          (product, index) =>
            index < 6 && (
              <Product
                product={product}
                key={index}
                className={styles.product}
              />
            )
        )}
      </div>

      <button
        className={styles.viewAllBtn}
        onClick={() => (window.location.href = "/products")}
      >
        View All
      </button>
    </div>
  );
}

export default FeaturedProducts;
