import React, { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../Principal/Modal/Modal";
import { ModalFormEditDataDomain } from "./Modals/ModalFormEditDataDomain";

import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import "../../Styles/DomainSGI/DomainData.css";

export const DomainData = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);
  const [modalEditDataDomain, setModalEditDataDomain] = useState(false);
  const [inputPassword, setInputPassword] = useState(false);

  const showPassword = (e) => {
    e.preventDefault();

    let tipo = document.getElementById("password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
    inputPassword ? setInputPassword(false) : setInputPassword(true);
  };

  return (
    <div className="container__domaindata">
      <div className="container__domaindata--tittle">
        <p>Datos de dominio</p>
      </div>
      <div className="container__columns">
        <div className="container__column">
          <div>
            <strong>
              <label>Estado:</label>
            </strong>
            <input
              className="container__columns--config"
              type="text"
              value={
                !domainInfo.isLoaded
                  ? "*******"
                  : domainInfo.DataContact[0].status
              }
              disabled
            />
          </div>
          <div>
            <strong>
              <label>Fecha de Registro:</label>
            </strong>
            <input
              className="container__columns--config container__columns--inputdate"
              type="text"
              value={
                !domainInfo.isLoaded
                  ? "*******"
                  : domainInfo.CreationDate.split("T")[0]
              }
              disabled
            />
          </div>
          <div>
            <strong>
              <label>Fecha de Vencimiento:</label>
            </strong>
            <input
              className="container__columns--config"
              type="text"
              value={
                !domainInfo.isLoaded
                  ? "*******"
                  : domainInfo.ExpirationDate.split("T")[0]
              }
              disabled
            />
          </div>
        </div>
        <hr className="hr__item" />
        <div>
          <div className="container__authcode">
            <strong>
              <label>AuthCode:</label>
            </strong>
            <div className="container__inputbtn">
              <input
                className="input__auth--config"
                type="password"
                name="password"
                id="password"
                value={domainInfo.AuthorizationCode}
                disabled
              />
              <button
                className="bttn"
                type="button"
                onClick={(e) => showPassword(e)}
              >
                {inputPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <strong>
              <label>Protección contra Robo:</label>
            </strong>
            <input
              className="container__columns--config container__columns--inputstealprotect"
              type="text"
              value={
                !domainInfo.isLoaded
                  ? "*******"
                  : `${domainInfo.TransferLock === "N" ? "No" : "Si"}`
              }
              disabled
            />
          </div>
          <div>
            <strong>
              <label>Protección de privacidad:</label>
            </strong>
            <input
              className="container__columns--config"
              type="text"
              value={
                !domainInfo.isLoaded
                  ? "*******"
                  : `${domainInfo.WhoisPrivacy === null ? "No" : "Si"}`
              }
              disabled
            />
          </div>
        </div>
      </div>
      <div className="domainData_button__container">
        <p>Editar</p>
        {(domainInfo.DataContact[0].DomainPlatform==='Osiris')?<button
          onClick={() => setModalEditDataDomain(!modalEditDataDomain)}
          className="button__edit"
        >
          <FaEdit />
        </button>: ''}
        <Modal
          status={modalEditDataDomain}
          changeStatus={setModalEditDataDomain}
          modalTitle="Cambio de Datos de Dominio"
        >
          <ModalFormEditDataDomain />
        </Modal>
      </div>
    </div>
  );
};
