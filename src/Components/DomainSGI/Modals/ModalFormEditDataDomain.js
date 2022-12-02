import React from "react";

import "../../../Styles/DomainSGI/Modals/ModalFormEditDataDomain.css";

export const ModalFormEditDataDomain = () => {
  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles;
  const admin = authData.data.roles;
  const comercial = authData.data.roles.split(",")[0];
  const hdr = authData.data.roles.split(",")[0];

  const handleChangeSuspend = (e) => {
    e.preventDefault();
  };

  const handleChangeTheftProtection = (e) => {
    e.preventDefault();
  };

  const handleChangePricavyProtection = (e) => {
    e.preventDefault();
  };

  return (
    <div className="changeDataDomain_container">
      <div className="changeDataDomain_content">
        <b style={{ marginBottom: "10px" }}>Suspender</b>
        <div className="switchBtn">
          <input
            type="checkbox"
            className="switchBtn__checkbox"
            id="suspend"
            onChange={
              superuser === "SUPERUSER" ||
              admin === "ADMINISTRATIVO" ||
              hdr === "SOPORTEHDR"
                ? (e) => handleChangeSuspend(e)
                : undefined
            }
            /* checked={customerInf.SecondfaStatus}
            disabled={
              !customerInf.isLoaded || customerInf.SecondfaStatus === false
            } */
          />
          <label htmlFor="suspend" className="slide"></label>
        </div>
      </div>

      <div className="changeDataDomain_content">
        <b style={{ marginBottom: "10px" }}>Protección contra Robo</b>
        <div className="switchBtn">
          <input
            type="checkbox"
            className="switchBtn__checkbox"
            id="theftProtection"
            onChange={
              superuser === "SUPERUSER" ||
              admin === "ADMINISTRATIVO" ||
              comercial === "COMERCIAL"
                ? (e) => handleChangeTheftProtection(e)
                : undefined
            }
            /* checked={customerInf.SecondfaStatus}
            disabled={
              !customerInf.isLoaded || customerInf.SecondfaStatus === false
            } */
          />
          <label htmlFor="theftProtection" className="slide"></label>
        </div>
      </div>

      <div className="changeDataDomain_content">
        <b style={{ marginBottom: "10px" }}>Proteccion de Privacidad</b>
        <div className="switchBtn">
          <input
            type="checkbox"
            className="switchBtn__checkbox"
            id="pricavyProtection"
            onChange={
              superuser === "SUPERUSER" ||
              admin === "ADMINISTRATIVO" ||
              comercial === "COMERCIAL"
                ? (e) => handleChangePricavyProtection(e)
                : undefined
            }
            /* checked={customerInf.SecondfaStatus}
            disabled={
              !customerInf.isLoaded || customerInf.SecondfaStatus === false
            } */
          />
          <label htmlFor="pricavyProtection" className="slide"></label>
        </div>
      </div>
    </div>
  );
};
