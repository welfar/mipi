import React from "react";

import "../../Styles/Customers/ServicesContainer.css";

export const ServicesContainer = ({ title, children, search, setSearch }) => {
  const handleChange = (e) => {
    console.log(e);
    const { value } = e.target;
    setSearch(value);
  };
  return (
    <>
      <div className="containerSection">
        <div className="containerSection--header">
          <p className="headerTitle">{title}</p>
          <input
            style={{ width: "65%", marginRight: "1rem" }}
            className="form-control"
            placeholder="Busca por dominio"
            value={search}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="containerSection--line"></div>
        <div className="containerContent">{children[0]}</div>
        <div className="buttonTransations">{children[1]}</div>
      </div>
    </>
  );
};
