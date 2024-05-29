import React from "react";

import sortByStyles from "./SortBy.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

function SortBy() {
  const [sortBy, setSortBy] = React.useState("");
  const [isSortByOpen, setIsSortByOpen] = React.useState(false);

  const handleSortBy = () => {
    setIsSortByOpen(!isSortByOpen);
  };

  return (
    <div>
      <div
        className={sortByStyles.sortBy}
        area-label="Sort By"
        role="listbox"
        onClick={() => console.log("Sort By")}
      >
        {/* No select. just the Sort By title and a wrapper for  dropdown items*/}
        <span className={sortByStyles.sortByTitle}>Sort By</span>
        <div
          className={
            isSortByOpen
              ? sortByStyles.sortByDropdown + " " + sortByStyles.open
              : sortByStyles.sortByDropdown
          }
        >
          <div
            className={sortByStyles.sortByDropdownItem}
            onClick={() => setSortBy("Price")}
          >
            Price
          </div>
          <div
            className={sortByStyles.sortByDropdownItem}
            onClick={() => setSortBy("Popularity")}
          >
            Popularity
          </div>
          <div
            className={sortByStyles.sortByDropdownItem}
            onClick={() => setSortBy("Rating")}
          >
            Rating
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortBy;
