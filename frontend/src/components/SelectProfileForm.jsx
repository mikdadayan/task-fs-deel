import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { styles } from "../pages/styles";

const SelectProfileForm = ({ isLogin, setProfile }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profiles?type=client`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles(
          data.profiles.filter((profile) => profile.type === "client")
        );
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSetProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedProfile,
        }),
      });
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("profile", JSON.stringify(data.profile));
      setProfile(data.profile);
      isLogin && history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="profileSelect">Select a profile:</label>
      <select
        id="profileSelect"
        value={selectedProfile}
        onChange={(e) => setSelectedProfile(Number(e.target.value))}
      >
        <option value={null}>Select a profile...</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {`${profile.firstName} ${profile.lastName}`}
          </option>
        ))}
      </select>

      <button
        style={styles.button}
        onClick={handleSetProfile}
        disabled={selectedProfile === null}
      >
        {isLogin ? "Login" : "SelectedProfile"}
      </button>
    </div>
  );
};

export default SelectProfileForm;
