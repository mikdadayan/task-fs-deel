import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { JobsPage } from "./pages/Jobs";
import { styles } from "./pages/styles";
import { LoginPage } from "./pages/Login";
import Main from "./pages/Main";
import Layout from "./components/Layout";

function App() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );

  return (
    <Router>
      <div style={styles.container}>
        <Route
          path="/login"
          component={(props) => (
            <LoginPage {...props} setProfile={setProfile} />
          )}
        />
        <Layout profile={profile} setProfile={setProfile}>
          <Route
            path="/jobs"
            component={(props) => (
              <JobsPage {...props} setProfile={setProfile} />
            )}
          />
          <Route
            exact
            path="/"
            component={(props) => (
              <Main {...props} setProfile={setProfile} profile={profile} />
            )}
          />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
