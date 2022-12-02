import React from "react";
import { useSelector } from "react-redux";

import { FaUserAstronaut } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

export const CustomerDataMiConstructor = () => {
  const constructorInfo = useSelector((state) => state.constructorInfo);

  return (
    <>
      <div className="data__container">
        <div className="costumerData__header">
          <div className="costumerData__header--left">
            <div className="costumerData__header--icon">
              <FaUserAstronaut />
            </div>
            <div>
              <p className="costumerData__header--name">
                {!constructorInfo.isLoaded
                  ? "***************"
                  : `${constructorInfo.NameClient} ${
                      constructorInfo.LastName === "UNDEFINED"
                        ? ""
                        : constructorInfo.LastName
                    }`}
              </p>
            </div>
            <div className="costumerData__header--circle">
              {constructorInfo.status === "ACTIVE" ? <BsCircleFill /> : null}
            </div>
          </div>
        </div>

        <div className="costumerData__content">
          <div className="costumerData__content--left">
            <div className="costumerData__content--titles">
              <p>Identificación:</p>
              <p>Correo:</p>
            </div>
            <div className="costumerData__content--data">
              <p>
                {!constructorInfo.isLoaded
                  ? "*****"
                  : constructorInfo.Identification === ""
                  ? "******"
                  : constructorInfo.Identification}
              </p>
              <p>
                {!constructorInfo.isLoaded ? "*****" : constructorInfo.Email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
