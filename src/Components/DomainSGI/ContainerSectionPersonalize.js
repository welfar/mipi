import React from "react";

import "../../Styles/DomainSGI/ContainerSectionPersonalize.css";

export const ContainerSectionPersonalize = ({ title, children }) => {
  return (
    <>
      <div className="container__section">
        <div className="container__section--header">
          <p className="sectionpersonalize_header__title">{title}</p>
          <div className="header__button">{children[0]}</div>
        </div>
        <div className="container__section--line"></div>
        <div>{children[1]}</div>
      </div>
    </>
  );
};
