import React from "react";

import {
  FaRecycle,
  FaChartLine,
  FaEdit,
  FaGlobeAmericas,
  FaEnvelopeOpenText,
  FaServer,
} from "react-icons/fa";

import "../../Styles/Dashboard/CardServices.css";

export const CardServices = ({
  title,
  text1,
  text2,
  text3,
  numberRegistered,
}) => {
  return (
    <>
      <div className="cardContainer">
        <p className="card__title">{title}</p>

        <div className="card__content">
          <div className="card__content--up">
            <div className="card__content--upitem">
              <div className="icon">
                {text1 === "Registros" ? (
                  <FaEdit />
                ) : text1 === "Dominios" ? (
                  <FaGlobeAmericas />
                ) : null}
              </div>
              <p className="type">{text1}</p>
            </div>

            <div className="card__content--upitem">
              <p className="date"> Hoy </p>
              <p className="number"> {numberRegistered} </p>
            </div>
          </div>

          <div className="line"></div>
          <div className="card__content--down">
            <p className="date"> Ayer </p>
            <p className="number"> {numberRegistered} </p>
          </div>
        </div>

        <div className="card__content">
          <div className="card__content--up">
            <div className="card__content--upitem">
              <div className="icon">
                {text2 === "Renovación" ? (
                  <FaRecycle />
                ) : text2 === "Correos" ? (
                  <FaEnvelopeOpenText />
                ) : null}
              </div>
              <p className="type">{text2}</p>
            </div>

            <div className="card__content--upitem">
              <p className="date"> Hoy </p>
              <p className="number"> {numberRegistered} </p>
            </div>
          </div>

          <div className="line"></div>
          <div className="card__content--down">
            <p className="date"> Ayer </p>
            <p className="number"> {numberRegistered} </p>
          </div>
        </div>

        <div className="card__content">
          <div className="card__content--up">
            <div className="card__content--upitem">
              <div className="icon">
                {text3 === "Cumplido" ? (
                  <FaChartLine />
                ) : text3 === "Hosting" ? (
                  <FaServer />
                ) : null}
              </div>
              <p className="type">{text3}</p>
            </div>

            <div className="card__content--upitem">
              <p className="date"> Hoy </p>
              <p className="number"> {numberRegistered} </p>
            </div>
          </div>

          <div className="line"></div>
          <div className="card__content--down">
            <p className="date"> Ayer </p>
            <p className="number"> {numberRegistered} </p>
          </div>
        </div>
      </div>
    </>
  );
};
