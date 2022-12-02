import React from "react";

import "../../../Styles/DomainSGI/DNSRegisterSelect/SelectList.css";

export const SelectList = ({ handleChange }) => {
  return (
    <div className="select__item">
      <select
        className="select--config__records"
        name="register"
        id="register"
        onChange={(e) => handleChange(e)}
      >
        <option value="">Tipo</option>
        <option value="A">Registros A</option>
        <option value="AAAA">Registros AAAA</option>
        <option value="MX">Registros MX</option>
        <option value="CNAME">Registros CNAME</option>
        <option value="TXT">Registros TXT</option>
      </select>
    </div>
  );
};
