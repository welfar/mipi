import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startLogin } from "../../actions/auth";
import { UnSetError } from "../../actions/ui";

import { FaUserAstronaut, FaLock } from "react-icons/fa";
import "../../Styles/Login/LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: "", password: "" });

  const msgError = useSelector((state) => state.ui.MessageError);

  if (msgError !== null) {
    setTimeout(() => {
      dispatch(UnSetError());
    }, 5000);
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(startLogin(login.email, login.password));
  };

  const enterKey = (e) => {
    const enterKeySearch = e.keyCode;

    if (enterKeySearch === 13) {
      return handleSubmit();
    }
  };
  window.onkeydown = enterKey;

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer__image">
          <h1 className="loginContainer__image--tittle">Panel interno</h1>
          <img
            className="sesion__img"
            src="https://mi.com.co/img/Login-panelinterno-2.png"
            alt="login"
          />
          <img
            className="micomco__logo"
            src="https://hostingvictory.com/wp-content/uploads/2020/02/mi.com_.co-hosting-logo.png"
            alt="micomco"
          />
        </div>

        <div className="loginContainer__sesion--ellipse"> </div>
        <div className="loginContainer__sesion">
          <h2 className="loginContainer__sesion--tittle">Bienvenido</h2>
          <p className="loginContainer__sesion--subtittle">
            Inicia sesión en tu cuenta
          </p>

          <div className="loginContainer__sesion--item">
            <div className="icon">
              <FaUserAstronaut />
            </div>

            <div className="inf">
              <p className="inf__tittle">Usuario</p>
              <input
                className="input-text"
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
                value={login.email}
              ></input>
            </div>
          </div>

          <div className="loginContainer__sesion--item">
            <div className="icon">
              <FaLock />
            </div>

            <div className="inf">
              <p className="inf__tittle">Contraseña</p>
              <input
                className="input-text"
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={login.password}
              ></input>
            </div>
          </div>
          <span style={{ textAlign: "center", width: "80%" }}>
            {msgError ? msgError : null}
          </span>

          <div className="btn__container">
            <button
              className="loginContainer__sesion--button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
