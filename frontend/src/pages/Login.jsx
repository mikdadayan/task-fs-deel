import React from "react";
import SelectProfileForm from "../components/SelectProfileForm";

export function LoginPage({ setProfile, xers }) {
  return (
    <div>
      <h2>Login</h2>
      <SelectProfileForm isLogin={true} setProfile={setProfile} />
    </div>
  );
}
