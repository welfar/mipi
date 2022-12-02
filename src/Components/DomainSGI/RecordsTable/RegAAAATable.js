import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRecords, deleteRecord } from "../../../actions/records";
import { EditRow } from "./Edit Row/EditRowRegAAAA";
import Loader from "../../Principal/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "../../../Styles/DomainSGI/RecordsTable/RecordsTable.css";
import Swal from "sweetalert2";

export const RegAAAATable = ({ domainName }) => {
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

  const handleEdit = (e, index) => {
    e.preventDefault();
    setEditMode(true);
    setIndexEdit(index);
  };

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
        dispatch(deleteRecord(domainName, rrsets));
        Swal.fire("Eliminado!", "La petición ha sido enviada", "info");
      }
    });
  };

  useEffect(() => {
    dispatch(getRecords(domainName, "AAAA"));
  }, [dispatch, domainName]);

  return (
    <>
      <div className="table__containter">
        <div
          className="first_row-titles"
          style={{ display: "flex", width: "100%" }}
        >
          <div className="names_colums" style={{ width: "30%" }}>
            SUBDOMINIO
          </div>
          <div className="names_colums" style={{ width: "30%" }}>
            DOMINIO
          </div>
          <div className="names_colums" style={{ width: "30%" }}>
            IPv6 DESTINO
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
              return (
                <div key={index}>
                  <div className="row row__table">
                    <div style={{ display: "flex", width: "100%" }}>
                      <div className="row__content" style={{ width: "30%" }}>
                        {item.name === domainName + "."
                          ? "@"
                          : item.name.split(".")[0]}
                      </div>
                      <div className="row__content" style={{ width: "30%" }}>
                        <strong>{domainName}</strong>
                      </div>
                      <div className="row__content" style={{ width: "30%" }}>
                        {item.content}
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
                                "AAAA",
                                item.content
                              )
                            }
                          />
                          <FaEdit
                            color="#25233c"
                            onClick={(e) => handleEdit(e, index)}
                          />
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
                      purpose={item.content}
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
