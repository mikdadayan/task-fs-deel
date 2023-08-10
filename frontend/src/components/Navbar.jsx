import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../pages/styles";
import SelectProfileForm from "./SelectProfileForm";
import { LogOut } from "./LogOut";

export function Navbar({ profile, setProfile }) {
  return (
    <div style={styles.header}>
      <nav style={styles.nav}>
        <span>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
        </span>
        <span>
          <SelectProfileForm setProfile={setProfile} profile={profile} />{" "}
          <span>Balance: ${profile && profile.balance}</span>
        </span>
        <span>
          <LogOut />
        </span>
      </nav>
    </div>
  );
}
