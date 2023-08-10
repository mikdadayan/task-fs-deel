import React from "react";
import { styles } from "../pages/styles";
import { useHistory } from "react-router-dom";

export function LogOut(props) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("authToken");
    history.push("/login");
  };
  return (
    <button onClick={handleLogout} style={styles.navLink}>
      Log Out
    </button>
  );
}
