import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styles } from "./styles";

export function JobsPage({ setProfile }) {
  const location = useLocation();
  const selectedContractorId = location.state?.contractorId;
  const [jobs, setJobs] = useState([]);
  const profile_id = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
      headers: { profile_id, selectedContractorId },
    })
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error(error));
  }, [selectedContractorId, profile_id]);

  const payForJob = (jobId) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/jobs/${jobId}/pay`, {
        method: "POST",
        headers: { profile_id },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            alert(data.error);
            throw new Error(data.error);
          }
          setProfile(data.profile);
          localStorage.setItem("profile", JSON.stringify(data.profile));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching unpaid jobs:", error);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
      <ul style={styles.list}>
        {jobs.map((job) => (
          <li key={job.id} style={styles.jobListItem}>
            {job.description} - ${job.price}{" "}
            {!job.paid && (
              <button style={styles.button} onClick={() => payForJob(job.id)}>
                Pay
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
