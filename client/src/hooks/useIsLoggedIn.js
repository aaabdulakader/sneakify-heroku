import { useState, useEffect } from "react";

// Helper function to parse cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("jwt");
    console.log("token", token);
    if (token) {
      // Optionally, validate the token with your backend here
      setLoggedIn(true);
    }
  }, []);

  return loggedIn;
};

export default useLoggedIn;
