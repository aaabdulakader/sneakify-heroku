import { useState, useEffect } from "react";
const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.split(";").find((cookie) => {
      return cookie.includes("jwt");
    });
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return loggedIn;
};

export default useLoggedIn;
