import { React, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Product.module.css";
import { RxCross2 } from "react-icons/rx";

function Product({ product, favorite }) {
  const [crossClicked, setCrossClicked] = useState(false);

  const handleAddRemoveFavorite = (productId) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const link = `http://localhost:9000/users/${user._id}/favorites/${productId}`;
    fetch(link, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleProductClick = (productSlug, target) => {
    product.image = `https://picsum.photos/200?random=${
      Math.floor(Math.random() * 100) + 100
    }`;

    localStorage.setItem("currentProduct", JSON.stringify(product));
    // Redirect to product details page

    if (target === "path" || target === "BUTTON") return;

    window.location.href = `/products/${productSlug}`;
  };

  // 100 to 200
  const randomImage = Math.floor(Math.random() * 100) + 100;
  const image = `https://picsum.photos/200?random=${randomImage}`;

  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      {...(favorite && crossClicked && { scale: 1.6 })}
      whileHover={{
        scale: 1.01,
        cursor: "pointer",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.7 }}
      className={
        styles.productCard +
        " " +
        (favorite && crossClicked ? styles.fadeOut : "") +
        " scale_up_center"
      }
      onClick={(e) => {
        handleProductClick(product.slug, e.target.tagName);
      }}
      {...(favorite && { style: { paddingBottom: "20px", width: "350px" } })}
    >
      <div className={styles.imgContainer}>
        <img src={product.stageImage} alt="product" loading="lazy" />
      </div>
      {/* product info div */}
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>{"$" + product.price}</p>
      </div>

      {/* {favorite && (
        <button className={styles.addToCartButton}>Add to Cart</button>
      )} */}

      {favorite && (
        <button
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            setCrossClicked(true);
            console.log("cross clicked", crossClicked);
            handleAddRemoveFavorite(product._id);
          }}
        >
          <RxCross2 className={styles.removeIcon} />
        </button>
      )}
    </motion.div>
  );
}

export default Product;
