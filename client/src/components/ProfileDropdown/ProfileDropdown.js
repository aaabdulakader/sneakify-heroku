import React from "react";

import profileDropdownStyles from "./ProfileDropdown.module.css";

function ProfileDropdown() {
  return (
    <div>
      <div className={profileDropdownStyles.profileDropdown}>
        <ul className={profileDropdownStyles.profileDropdownList}>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/orders">Orders</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/help">Help</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDropdown;
