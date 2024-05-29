import { React, useState } from "react";

import styles from "./Filter.module.css";

function Filter({ filters, onFilterChange, kids }) {
  // state
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  let sizes;
  if (kids) {
    sizes = [
      "1Y",
      "1.5Y",
      "2Y",
      "2.5Y",
      "3Y",
      "3.5Y",
      "4Y",
      "4.5Y",
      "5Y",
      "5.5Y",
      "6Y",
      "6.5Y",
      "7Y",
      "7.5Y",
      "8Y",
      "8.5Y",
      "9Y",
      "9.5Y",
      "10Y",
      "10.5Y",
      "11Y",
      "11.5Y",
      "12Y",
      "12.5Y",
      "13Y",
      "13.5Y",
    ];
  } else {
    sizes = [
      "6",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12",
      "12.5",
      "13",
    ];
  }

  console.log(sizes);

  // functions

  console.log(selectedCategory);
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked && selectedCategory === value) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(value);
    }
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, price: e.target.value });
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSizes = [...filters.sizes];

    if (checked) {
      updatedSizes.push(value);
    } else {
      updatedSizes = updatedSizes.filter((size) => size !== value);
    }

    onFilterChange({ ...filters, sizes: updatedSizes });
  };

  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    let updatedColors = [...filters.colors];

    if (checked) {
      updatedColors.push(value);
    } else {
      updatedColors = updatedColors.filter((color) => color !== value);
    }

    onFilterChange({ ...filters, colors: updatedColors });
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.header}>FILTERS</h3>

      {/* Category: Basketball, Running, Soccer, Training */}
      <div className={styles.categoryOptions}>
        <h4 className={styles.filterHeader}>Category</h4>

        {/* All */}

        <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-all"
            name="category"
            value=""
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-all" className={styles.categoryLabel}>
            All
          </label>
        </div>
        <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "lifestyle" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-lifestyle"
            name="category"
            value="lifestyle"
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-lifestyle" className={styles.categoryLabel}>
            Lifestyle
          </label>
        </div>
        <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "basketball" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-basketball"
            name="category"
            value="basketball"
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-basketball" className={styles.categoryLabel}>
            Basketball
          </label>
        </div>
        <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "running" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-running"
            name="category"
            value="running"
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-running" className={styles.categoryLabel}>
            Running
          </label>
        </div>
        {/* <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "soccer" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-soccer"
            name="category"
            value="soccer"
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-soccer" className={styles.categoryLabel}>
            Soccer
          </label>
        </div>
        <div
          className={
            styles.radioContainer +
            " " +
            (selectedCategory === "training" ? styles.active : "")
          }
        >
          <input
            type="radio"
            id="category-training"
            name="category"
            value="training"
            onChange={handleCategoryChange}
            className={styles.categoryRadio}
          />
          <label htmlFor="category-training" className={styles.categoryLabel}>
            Training
          </label>
        </div> */}
      </div>
      {/* Price */}

      <div className={styles.priceOptions}>
        <h4 className={styles.filterHeader}>Price</h4>
        <input
          type="range"
          id="price"
          name="price"
          min="50"
          max="300"
          step="50"
          onChange={(e) => {
            handlePriceChange(e);
            setPrice(e.target.value);
          }}
          className={styles.priceRangeSlider}
        />
        <label htmlFor="price" className={styles.priceLabel}>
          ${price}
        </label>
      </div>

      {/* Size */}

      <div className={styles.sizeContainer}>
        <h4 className={styles.filterHeader}>Size</h4>
        <div className={styles.sizeOptions}>
          {sizes.map((size) => (
            <div key={size} className={styles.size}>
              <input
                type="checkbox"
                id={size}
                name={size}
                value={size}
                onChange={handleSizeChange}
                className={styles.sizeCheckbox}
              />
              <label htmlFor={size} className={styles.sizeLabel}>
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
    </div>
  );
}

export default Filter;
