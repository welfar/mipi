import React, { useState } from "react";

import "../../../Styles/UserManager/ModalUserManager/ModalUpdatePassword.css";

export const ModalUpdatePassword = () => {
  const [pass, setPass] = useState("");

  const handleCange = (e) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <p>
        <b>Cuenta:</b> Duvancho@mi.com.co
      </p>
      <div className="modalUpdatePass_content_input-label">
        <div className="content_config content_left">
          <label htmlFor="newPass">
            <b>Nueva contraseña</b>
          </label>
          <input
            id="newPass"
            name="newPass"
            type="text"
            onChange={(e) => handleCange(e)}
            value={pass}
          />
        </div>

        <div className="content_config">
          <label htmlFor="repeatPass">
            <b>Repetir contraseña</b>
          </label>
          <input id="repeatPass" type="text" />
        </div>
      </div>
    </>
  );
};
