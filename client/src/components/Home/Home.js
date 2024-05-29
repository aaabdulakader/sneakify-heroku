import { React, useEffect, useState } from "react";

import styles from "./Home.module.css";

import {
  Hero,
  FeaturedProducts,
  Newsletter,
  Footer,
  ShopCategory,
} from "../index";

function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [products, setProducts] = useState([]);
  // get top products for hero slideshow
  const link = "http://localhost:9000/products/top/3";

  useEffect(() => {
    function fetchData() {
      fetch(link)
        .then((response) => response.json())
        .then((data) => setTopProducts(data.documents));

      fetch("http://localhost:9000/products")
        .then((response) => response.json())
        .then((data) => setProducts(data.documents));
    }

    fetchData();
  }, [link]);

  return (
    <div className={styles.container}>
      <Hero topProducts={topProducts} />
      {/* <ShopCategory /> */}
      <FeaturedProducts products={products} />
      <Newsletter />

    </div>
  );
}

export default Home;
