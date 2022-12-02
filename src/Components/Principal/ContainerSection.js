import React from "react";

import "../../Styles/Principal/ContainerSection.css";

const ContainerSection = ({ title, children }) => {
  return (
    <>
      <div className="container__section">
        <div className="container__section--header">
          <p className="contsection_header__title">{title}</p>
          <div className="contsection_header__button">{children[0]}</div>
        </div>
        <div className="container__section--line"></div>
        <div>{children[1]}</div>
      </div>
    </>
  );
};

export default ContainerSection;
