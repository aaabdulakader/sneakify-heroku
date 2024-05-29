// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
// import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
const { default: jwt_decode } = require("jwt-decode");

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("jwt"); // Assuming you store the JWT token in localStorage
//       if (token) {
//         const decoded = jwt_decode(token);
//         const currentTime = Date.now() / 1000;
//         if (decoded.exp < currentTime) {
//           // Token expired
//           setIsLoggedIn(false);
//         } else {
//           // Token valid
//           setIsLoggedIn(true);
//         }
//       } else {
//         // No token found
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("jwt"); // Retrieve token from cookie
      if (token) {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token expired
          setIsLoggedIn(false);
        } else {
          // Token valid
          setIsLoggedIn(true);
        }
      } else {
        // No token found
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
