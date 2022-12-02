import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import "moment/locale/es";

import "../../Styles/Reports/TableReport.css";

export const TableReport = () => {
  const reportInfo = useSelector((state) => state.reports.data);

  return (
    <>
      <div className="table__containter_reports">
        <div className="first_row-thRep">
          <div className="th_rowRep " style={{ width: "12.5%" }}>
            Estado
          </div>
          <div className="th_rowRep " style={{ width: "32.5%" }}>
            Dominio
          </div>
          <div className="th_rowRep " style={{ width: "12.5%" }}>
            ID. Usuario
          </div>
          <div className="th_rowRep " style={{ width: "12.5%" }}>
            ID. Paquete
          </div>

          <div className="th_rowRep " style={{ width: "12.5%" }}>
            Fecha de Registro
          </div>
          <div className="th_rowRep " style={{ width: "12.5%" }}>
            Fecha de Vencimiento
          </div>
          <div className="th_rowRep " style={{ width: "12.5%" }}>
            Nombre
          </div>
          <div className="th_rowRep " style={{ width: "32.5%" }}>
            Correo
          </div>
        </div>

        {reportInfo &&
          reportInfo.length > 0 &&
          reportInfo.map((item, index) => {
            return (
              <div className="table_rows_contentRep" key={index}>
                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {item ? item.domainstatus : null}
                </div>
                <div
                  className="table_tdRep"
                  style={{ width: "32.5%" }}
                  title={item.domain}
                >
                  {item
                    ? item.domain.length > 35
                      ? item.domain.substring(0, 35) + "..."
                      : item.domain
                    : null}
                </div>
                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {item ? item.userid : null}
                </div>
                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {item ? item.packageid : null}
                </div>

                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {moment(item ? item.regdate : null)
                    .locale("es")
                    .format("LL")}
                </div>
                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {moment(item ? item.nextduedate : null)
                    .locale("es")
                    .format("LL")}
                </div>
                <div className="table_tdRep" style={{ width: "12.5%" }}>
                  {item ? item.firstname : null}
                </div>
                <div
                  className="table_tdRep"
                  style={{ width: "32.5%" }}
                  title={item.email}
                >
                  {item
                    ? item.email.length > 35
                      ? item.email.substring(0, 35) + "..."
                      : item.email
                    : null}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
