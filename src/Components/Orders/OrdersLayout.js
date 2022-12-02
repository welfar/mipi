import React from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { OrderFilterSearch } from "./OrderFilterSearch";
import ContainerSection from "../Principal/ContainerSection";
import { TableOrders } from "./TableOrders";

import "../../Styles/Orders/OrdersLayout.css";

export const OrdersLayout = () => {
  const orderInfo = useSelector((state) => state.orderInfo);

  return (
    <>
      <OrderFilterSearch
        Query="Selecciona el tipo de dato por el que deseas realizar la búsqueda : "
        Typequery="Ingresa aquí los datos..."
      />

      {!orderInfo.isLoaded ? null : (
        <ContainerSection title="Servicios">
          <div className="btn__container orders">
            <CSVLink data={orderInfo.data} filename="Ordenes.csv">
              <button className="btn__content" id="export">
                Exportar
              </button>
            </CSVLink>
          </div>
          <div>
            <br />
            <div className="TableContainer">
              <TableOrders />
            </div>
          </div>
        </ContainerSection>
      )}
    </>
  );
};
