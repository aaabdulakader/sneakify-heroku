import { React, useState, useEffect } from "react";

import { Product } from "../index";

import styles from "./MightLike.module.css";

function MightLike({ cartitems }) {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const handleSuggestedProducts = async () => {
    const link = "http://localhost:9000/products/";
    try {
      const res = await fetch(link);
      const data = await res.json();
      setSuggestedProducts(data.documents);
      // console.log(data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cartitems);

  useEffect(() => {
    handleSuggestedProducts();
  }, []);

  // filter out the products that are already in the cart
  //   useEffect(() => {
  const filterProducts = suggestedProducts.filter((product, index) => {
    return !cartitems.some((item) => item._id === product._id);
  });

  // console.log(filterProducts);
  //     setSuggestedProducts(filterProducts);
  //   }, [cartitems]);

  return (
    <div className={styles.mightLike}>
      <h2 className={styles.mightLikeTitle}>
        You might {cartitems.length > 0 ? "also" : ""} like
      </h2>
      <div className={styles.mightLikeProducts}>
        {suggestedProducts
          .sort((a, b) => b.rating - a.rating)
          .map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default MightLike;
