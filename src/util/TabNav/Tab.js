import React from "react";

export const Tab = ({ isSelected, children }) => {
  return <>{isSelected ? <div className="container">{children}</div> : null}</>;
};
