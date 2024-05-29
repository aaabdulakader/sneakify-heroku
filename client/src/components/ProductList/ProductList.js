import { React, useState, useEffect } from "react";
import { Product, Filter } from "../index";
import { MdFilterListAlt } from "react-icons/md";
import { FaSort } from "react-icons/fa6";
// import { useHistory } from "react-router-dom";

import styles from "./ProductList.module.css";

function ProductList({ gender }) {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    price: 0,
    category: "",
  });

  const link = "http://localhost:9000/products/";

  useEffect(() => {
    fetchProducts();
  }, [gender, filters]);

  const fetchProducts = async (limit) => {
    return await fetch(link + (limit ? `?limit=${limit}` : ""))
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.documents;

        let iscategory = filters.category;
        let isprice = filters.price;
        let isgender = gender;
        let iscolor = filters.colors;
        let issizes = filters.sizes;

        // if (gender) {
        //   const filteredProducts = allProducts.filter(
        //     (product) => product.subTitle.toLowerCase() === gender.toLowerCase()
        //   );
        //   setProducts(filteredProducts);
        // } else {
        //   setProducts(allProducts);
        // }
        console.log("Filters", filters);

        if (iscategory || isprice || isgender || iscolor || issizes) {
          let filteredProducts = allProducts;
          if (iscategory) {
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.category.toLowerCase() ===
                filters.category.toLowerCase()
            );
          }
          if (isprice) {
            filteredProducts = filteredProducts.filter(
              (product) =>
                +filters.price !== 0 && +product.price <= +filters.price
            );
          }
          if (isgender) {
            filteredProducts = filteredProducts.filter(
              (product) =>
                product.subTitle.toLowerCase().includes(isgender.toLowerCase())
            );
          } 
          if (iscolor.length) {
            filteredProducts = filteredProducts.filter((product) =>
              iscolor.includes(product.color)
            );
          }
          if (issizes.length) {
            filteredProducts = filteredProducts.filter((product) =>
              product.sizes.some((size) => issizes.includes(size))
            );
          }
          if (filteredProducts.length === 0) {
            filteredProducts = allProducts;
          } else {
            setProducts(filteredProducts);
          }

          console.log("Filtered Products", filteredProducts);
        } else {
          setProducts(allProducts);
        }
      });
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleSortChange = (e) => {
    // Show loading indicator
    setLoading(true);

    if (e.target.value === "price-low-to-high") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (e.target.value === "price-high-to-low") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else if (e.target.value === "newest") {
      const sortedProducts = [...products].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setProducts(sortedProducts);
    }
    setLoading(false);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <div className={styles.filterByContainer} onClick={handleFilter}>
          <MdFilterListAlt className={styles.filterByIcon} />
          <button className={styles.filterByButton}>
            {showFilter ? "Hide Filter" : "Filter By"}
          </button>
        </div>

        {/* Sort by dropdown */}
        <div className={styles.sortByContainer}>
          Sort By:
          <select className={styles.sortBySelect} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="price-low-to-high">Price: Low-High</option>
            <option value="price-high-to-low">Price: High-low</option>
          </select>
        </div>
      </div>
      <div
        className={`${styles.productList} ${loading ? styles.loading : ""}`}
        id="productList"
      >
        <div
          className={
            styles.filterOptions + " " + (showFilter ? styles.show : "")
          }
        >
          <Filter
            onFilterChange={handleFilterChange}
            filters={filters}
            kids={gender === "kids"}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => {
            return <Product key={product._id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}

export default ProductList;
