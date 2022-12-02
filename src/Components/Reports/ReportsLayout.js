import React from "react";
import { CSVLink } from "react-csv";

import { ReportFilterSearch } from "./ReportFilterSearch";
import ContainerSection from "../Principal/ContainerSection";
import { TableReport } from "./TableReport";
import { useSelector } from "react-redux";

export const ReportsLayout = () => {
  const reportInfo = useSelector((state) => state.reports);

  return (
    <>
      <ReportFilterSearch Query="Selecciona el tipo de reporte a generar e ingresa el rango de fechas" />

      {!reportInfo.isLoaded ? null : (
        <ContainerSection title="Reportes">
          <div className="btn__container orders">
            <CSVLink data={reportInfo.data} filename="Reporte.csv">
              <button className="btn__content">Exportar</button>
            </CSVLink>
          </div>

          <div>
            <br />
            <div className="TableContainer">
              <TableReport />
            </div>
          </div>
        </ContainerSection>
      )}
    </>
  );
};
