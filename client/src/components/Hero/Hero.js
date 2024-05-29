import { React, useEffect, useState } from "react";

import styles from "./Hero.module.css";

// icons

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function Hero({ topProducts }) {
  // const [topProducts, setTopProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // setInterval(() => {
  //   setCurrentSlide(
  //     currentSlide === topProducts.length - 1 ? 0 : currentSlide + 1
  //   );
  // }, 5000);

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroSlides}>
          {topProducts.map((product, index) => (
            <div
              key={index}
              className={
                index === currentSlide
                  ? styles.heroSlide + " " + styles.active
                  : styles.heroSlide
              }
              onClick={() =>
                (window.location.href = "/products/" + product.slug)
              }
              // listen for finger swipe
              onTouchStart={(e) => {
                const touchStart = e.changedTouches[0].clientX;
                const touchEnd = e.changedTouches[0].clientX;
                if (touchStart - touchEnd > 100) {
                  setCurrentSlide(
                    currentSlide === topProducts.length - 1
                      ? 0
                      : currentSlide + 1
                  );
                } else if (touchStart - touchEnd < -100) {
                  setCurrentSlide(
                    currentSlide === 0
                      ? topProducts.length - 1
                      : currentSlide - 1
                  );
                }
              }}
            >
              <img
                className={styles.heroImage}
                src={product.stageImage}
                alt={product.title}
              />
              <div className={styles.heroText}>
                <h1 className={styles.title}>{product.title}</h1>
                <p>{product.subTitle}</p>
                <a
                  className={styles.shopBtn}
                  href={"/products/" + product.slug}
                >
                  Shop
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.heroDots}>
          {topProducts.map((product, index) => (
            <span
              key={index}
              className={
                index === currentSlide
                  ? styles.heroDot + " " + styles.active
                  : styles.heroDot
              }
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
        <div className={styles.heroArrows}>
          <FaAngleLeft
            className={styles.heroArrow + " " + styles.left}
            onClick={() => {
              setCurrentSlide(
                currentSlide === 0 ? topProducts.length - 1 : currentSlide - 1
              );
            }}
          />

          <FaAngleRight
            className={styles.heroArrow + " " + styles.right}
            onClick={() => {
              setCurrentSlide(
                currentSlide === topProducts.length - 1 ? 0 : currentSlide + 1
              );
            }}
          />
          {/* <FaAngleRight /> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
