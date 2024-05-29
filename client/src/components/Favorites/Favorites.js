import { React, useEffect, useState } from "react";
import { Product, MightLike } from "./../index.js";

import styles from "./Favorites.module.css";
import { px } from "framer-motion";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  // get user favorites
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const link = `http://localhost:9000/users/${user._id}`;

  useEffect(() => {
    const getFavorites = async () => {
      if (!user) return;
      const response = await fetch(link);
      const data = await response.json();
      console.log(data.document);
      setFavorites(data.document.favorites);
    };
    getFavorites();
  }, []);

  return (
    <div>
      <div className={styles.content}>
        <h1 className={styles.title}>Favorites</h1>

        <div className={styles.favorites}>
          {favorites.length <= 0 ? "No items in favorites" : ""}
          {favorites.map((product) => (
            <Product
              key={product._id}
              product={product}
              favorite={true}
              // style={{ width: "100%" }}
            />
          ))}
          {/* remove & add to cart buttons */}
          {/* <div className={styles.actionButtons}>
            <button className={styles.addToCartButton}>Add to Cart</button>
            <button className={styles.removeButton}>Remove</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
