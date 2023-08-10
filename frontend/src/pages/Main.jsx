import React from "react";
import PayJobsForm from "../components/PayJobsForm";
import { useHistory } from "react-router-dom";
import { styles } from "./styles";

const Main = ({ profile, setProfile }) => {
  const history = useHistory();

  const depositAmounts = [1, 5, 10, 50, 100, 500];
  const handleDeposit = async (amount) => {
    try {
      const userId = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/balances/deposit/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        alert(data.error);
      } else {
        setProfile((prev) => {
          const depositProfile = { ...prev, balance: data.balance };
          localStorage.setItem("profile", JSON.stringify(depositProfile));
          return depositProfile;
        });
        console.log(`Deposit successful! New balance: ${data.balance}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayJobs = (selectedContractor) => {
    history.push(`/jobs`, {
      contractorId: selectedContractor.id,
    });
  };

  return (
    <div>
      <h2>Main Interface</h2>
      <div>
        <p>
          Logged in as: {profile && profile.firstName + " " + profile.lastName}
        </p>
        <div>
          {depositAmounts.map((amount) => (
            <button
              style={styles.button}
              key={amount}
              onClick={() => handleDeposit(amount)}
            >
              Deposit ${amount}
            </button>
          ))}
        </div>
      </div>
      <PayJobsForm
        onSubmit={handlePayJobs}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  );
};

export default Main;
