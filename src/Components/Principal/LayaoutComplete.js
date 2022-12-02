import React from "react";

import Navleft from "./Navleft";
import Header from "./Header";
import "../../Styles/Principal/LayaoutComplete.css";

const LayoutCompleted = ({ children, view }) => {
  const [navleftHide, setNavleftHide] = React.useState(false);

  const handleNavleft = () => {
    setNavleftHide((navleftHide) => !navleftHide);
  };

  return (
    <>
      <div className="container__body">
        {navleftHide ? (
          <div className="row">
            <div className="navleft__body--hide">
              <Navleft
                navleftHide={navleftHide}
                handleNavleft={handleNavleft}
              />
            </div>
            <div className="body__content--hide">
              <Header view={view} />
              {children}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="navleft__body">
              <Navleft
                navleftHide={navleftHide}
                handleNavleft={handleNavleft}
              />
            </div>
            <div className="body__content">
              <Header view={view} />
              {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LayoutCompleted;
