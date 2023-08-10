import React, { useState, useEffect } from "react";
import { styles } from "../pages/styles";

const PayJobsForm = ({ onSubmit }) => {
  const [selectedContractor, setSelectedContractor] = useState({});
  const [contractors, setContractors] = useState([]);
  const [suggestedContractors, setSuggestedContractors] = useState([]);

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/profiles?type=contractor`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching contractors");
      }
      const data = await response.json();
      const contractorProfiles = data.profiles;

      setContractors(contractorProfiles);
    } catch (error) {
      console.error("Error fetching contractors:", error);
    }
  };

  const handleSelectContractor = (contractor) => {
    setSelectedContractor(contractor);
    setSuggestedContractors([]);
  };
  const handleInputChange = (value) => {
    if (value) {
      const suggestions = contractors.filter((contractor) =>
        contractor.firstName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedContractors(suggestions);
    } else {
      setSuggestedContractors([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedContractor);
  };

  return (
    <div>
      <h2>Search Jobs for...</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contractorInput">Select a contractor:</label>
        <input
          id="contractorInput"
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          autoComplete="off"
        />

        {selectedContractor.firstName && (
          <span style={styles.contractorSpan}>
            {selectedContractor.firstName &&
              selectedContractor.firstName + " " + selectedContractor.lastName}
          </span>
        )}
        <ul style={styles.list}>
          {suggestedContractors.map((contractor) => (
            <li
              key={contractor.id}
              style={styles.listItem}
              onClick={() => handleSelectContractor(contractor)}
            >
              {contractor.firstName + " " + contractor.lastName}
            </li>
          ))}
        </ul>
        <button
          style={styles.button}
          type="submit"
          disabled={!selectedContractor}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PayJobsForm;
