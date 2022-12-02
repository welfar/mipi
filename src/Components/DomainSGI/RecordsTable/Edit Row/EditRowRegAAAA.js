import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaCheck, FaTimes } from "react-icons/fa";

import "../../../../Styles/DomainSGI/RecordsTable/EditRow.css";
import Swal from "sweetalert2";
import { editRecord } from "../../../../actions/records";

/* setIndexEdit; */
export const EditRow = ({ index, setEditMode, subdomain, purpose }) => {
  const domainInfo = useSelector((state) => state.domainsInfo);
  const dispatch = useDispatch();

  const [editInfoRow, setEditInfoRow] = useState({
    subdomain: subdomain,
    purpose: purpose,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setEditInfoRow({
      ...editInfoRow,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    if (editInfoRow.subdomain === "" || editInfoRow.subdomain === undefined) {
      alert("No se puede crear un registro sin subdominio");
      return;
    }
    if (editInfoRow.purpose === "" || editInfoRow.purpose === null) {
      alert("No se puede crear un registro sin apuntamiento");
      return;
    }

    const rrsets = {
      record: editInfoRow.subdomain,
      type: "AAAA",
      content: editInfoRow.purpose,
    };
    Swal.fire({
      title: "¿Estas seguro?",
      html:
        `<p>Se realizara el cambio del registro <b>${
          editInfoRow.subdomain === "@"
            ? "WildCard"
            : editInfoRow.subdomain + "." + domainInfo.NameDomain
        }</b> con apuntamiento hacia la IP: <b>${
          editInfoRow.purpose
        }</b> ?</p>` + `<p>Esta accion no se puede deshacer</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardarlo!",
    }).then((result) => {
      if (result.value) {
        dispatch(editRecord(domainInfo.NameDomain, rrsets));
        Swal.fire("Eliminado!", "La petición ha sido enviada", "info");
        setEditMode(false);
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <>
      <div
        className="container_row_content"
        key={index}
        style={{ display: "flex", width: "100%" }}
      >
        <div className="row__content" style={{ width: "30%" }}>
          <strong className="row__content-edit_input dom">
            {editInfoRow.subdomain}
          </strong>
        </div>
        <div className="row__content" style={{ width: "30%" }}>
          <strong className="row__content-edit_input dom">
            {domainInfo.NameDomain}
          </strong>
        </div>
        <div className="row__content" style={{ width: "30%" }}>
          <input
            className="row__content-edit_input"
            type="text"
            name="purpose"
            placeholder="ff06:0:0:0:0:0:0:c3"
            value={editInfoRow.purpose}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="row__content" style={{ width: "10%" }}>
          <FaTimes color="#0096FF" onClick={(e) => handleCancel(e)} />
          <FaCheck color="#23814B" onClick={(e) => handleSave(e)} />
        </div>
      </div>

      <hr className="table__hr" />
    </>
  );
};
