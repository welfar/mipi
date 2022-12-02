import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaCheck, FaTimes } from "react-icons/fa";

import "../../../../Styles/DomainSGI/RecordsTable/EditRow.css";
import Swal from "sweetalert2";
import { editRecord } from "../../../../actions/records";

/* setIndexEdit; */
export const EditRow = ({ index, setEditMode, subdomain, purpose }) => {
  const dispatch = useDispatch();
  const domainInfo = useSelector((state) => state.domainsInfo);

  const [editInfoRow, setEditInfoRow] = useState({
    subdomain: subdomain,
    ipv4: purpose,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setEditInfoRow({
      ...editInfoRow,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    const ipv4_regex =
      /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;

    if (editInfoRow.subdomain === "" || editInfoRow.subdomain === undefined) {
      setEditInfoRow({
        ...editInfoRow,
        subdomain: "@",
      });
    }
    if (editInfoRow.ipv4 === "" || editInfoRow.ipv4 === null) {
      alert("No se puede crear un registro sin apuntamiento");
      return;
    }
    if (!ipv4_regex.test(editInfoRow.ipv4)) {
      alert("El apuntamiento debe ser una IPv4 valida para el registro A");
      return;
    }

    const rrsets = {
      record: editInfoRow.subdomain,
      type: "A",
      content: editInfoRow.ipv4,
    };
    Swal.fire({
      title: "¿Estas seguro?",
      html:
        `<p>Se realizara el cambio del registro <b>${
          editInfoRow.subdomain === "@"
            ? "WildCard"
            : editInfoRow.subdomain + "." + domainInfo.NameDomain
        }</b> con apuntamiento hacia la IP: <b>${editInfoRow.ipv4}</b> ?</p>` +
        `<p>Esta accion no se puede deshacer</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardarlo!",
    }).then((result) => {
      if (result.value) {
        dispatch(editRecord(domainInfo.NameDomain, rrsets));
        Swal.fire(
          "Modificado!",
          "La petición ha sido enviada con éxito",
          "info"
        );
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
            name="ipv4"
            placeholder="54.235.109.100"
            value={editInfoRow.ipv4}
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
