import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { EditRow } from "./Edit Row/EditRowRegMX";
import { deleteRecord, getRecords } from "../../../actions/records";
import Loader from "../../Principal/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "../../../Styles/DomainSGI/RecordsTable/RecordsTable.css";

export const RegMXTable = ({ domainName }) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.data);
  const isLoading = useSelector((state) => state.records.isLoaded);
  const isError = useSelector((state) => state.ui.MessageError);

  const [editMode, setEditMode] = useState(false);
  const [indexEdit, setIndexEdit] = useState(undefined);

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const adm = authData.data.roles.split(",")[0];
  const lider = authData.data.roles.split(",")[1];
  const maia = authData.data.roles.split(",")[0];
  const hdr = authData.data.roles.split(",")[0];

  const handleDelete = (e, domainName, record, type, content) => {
    e.preventDefault();
    const rrsets = {
      record,
      type,
      content,
    };
    Swal.fire({
      title: "¿Estas seguro?",
      html:
        `<p>Eliminaras el registro <b>${record}</b> del dominio <b>${domainName}</b>?</p>` +
        `<p>Este registro sera eliminado <b>permanentemente</b></p>` +
        `<p>Esta accion no se puede deshacer</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Eliminado!", "La petición ha sido enviada", "info");
        dispatch(deleteRecord(domainName, rrsets));
      }
    });
  };

  const handleEdit = (e, index) => {
    e.preventDefault();
    setEditMode(true);
    setIndexEdit(index);
  };

  useEffect(() => {
    dispatch(getRecords(domainName, "MX"));
  }, [dispatch, domainName]);

  return (
    <>
      <div className="table__containter">
        <div
          className="first_row-titles"
          style={{ display: "flex", width: "100%" }}
        >
          <div className="names_colums" style={{ width: "20%" }}>
            SUBDOMINIO
          </div>
          <div className="names_colums" style={{ width: "20%" }}>
            DOMINIO
          </div>
          <div className="names_colums" style={{ width: "5%" }}>
            PRIORIDAD
          </div>
          <div className="names_colums" style={{ width: "45%" }}>
            DESTINO
          </div>
          {(adm === "SUPERUSER" ||
            lider === "LIDER" ||
            maia === "MAIA" ||
            hdr === "SOPORTEHDR") && (
            <div className="names_colums" style={{ width: "10%" }}></div>
          )}
        </div>
        <hr className="table__hr" />
        <div className="render_rows">
          {/* Render rows only if the data is loaded */}
          {!isLoading ? (
            <div
              className="loader"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {isError ? (
                <p className="reg_table__msg">
                  El dominio: <strong>{domainName} </strong>no está en nuestra
                  Zona DNS...
                </p>
              ) : (
                <div className="reg_table__loader">
                  <Loader />
                </div>
              )}
            </div>
          ) : (
            records.map((item, index) => {
              const itemName =
                item.name === domainName + "." ? "@" : item.name.split(".")[0];
              return (
                <div key={index}>
                  <div className="row row__table">
                    <div style={{ display: "flex", width: "100%" }}>
                      <div
                        className="row__content"
                        style={{ width: "20%" }}
                        title={item.name}
                      >
                        {itemName.length > 20
                          ? itemName.substring(0, 20) + "..."
                          : itemName}
                      </div>
                      <div className="row__content" style={{ width: "20%" }}>
                        <strong>{domainName}</strong>
                      </div>
                      <div className="row__content" style={{ width: "5%" }}>
                        {item.content.split(" ")[0]}
                      </div>
                      <div className="row__content" style={{ width: "45%" }}>
                        {item.content.length > 40
                          ? item.content.substring(0, 35) + "..."
                          : item.content.split(" ")[1]}
                      </div>
                      {(adm === "SUPERUSER" ||
                        lider === "LIDER" ||
                        maia === "MAIA" ||
                        hdr === "SOPORTEHDR") && (
                        <div className="row__content" style={{ width: "10%" }}>
                          <FaTrashAlt
                            color="#dd1144"
                            onClick={(e) =>
                              handleDelete(
                                e,
                                domainName,
                                item.name,
                                "MX",
                                item.content
                              )
                            }
                          />
                          {item.name === domainName + "." ? null : (
                            <FaEdit
                              color="#25233c"
                              onClick={(e) => handleEdit(e, index)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="table__hr" />
                  {editMode && index === indexEdit ? (
                    <EditRow
                      key={index}
                      setEditMode={setEditMode}
                      subdomain={
                        item.name === domainName + "."
                          ? "@"
                          : item.name.split(".")[0]
                      }
                      purpose={item.content.split(" ")[1].slice(0, -1)}
                      prior={item.content.split(" ")[0]}
                      /* setIndexEdit={setIndexEdit} */
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
