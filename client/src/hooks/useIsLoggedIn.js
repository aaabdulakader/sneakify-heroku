import { useState, useEffect } from "react";
const useLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes("jwt");
    console.log("token", token);
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return loggedIn;
};

export default useLoggedIn;
