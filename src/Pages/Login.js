import React from "react";

import LoginForm from "../Components/Login/LoginForm";
import "../Styles/Login.css";

export const Login = () => {
  return (
    <>
      <div className="background__login centrar">
        <LoginForm />
      </div>
    </>
  );
};
