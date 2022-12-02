import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
/* import { FaEdit } from "react-icons/fa"; */

import { setError } from "../../actions/ui";
import { SERVER_URL } from "../../util/TabNav/Access/Access";
import {
  clearDataConstructor,
  StartSearchConstructor,
} from "../../actions/constructorInfo";

import Loader from "../Principal/Loader";
import "../../Styles/MiConstructor/ServiceData.css";

export const ServiceData = ({ domain }) => {
  const constructorInfo = useSelector((state) => state.constructorInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const cookies = new Cookies();

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles;
  const hdr = authData.data.roles.split(",")[0];
  const desarrollo = authData.data.roles;

  const handleChangeSuspend = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `${SERVER_URL}/api/v1/constructor/suspend/${constructorInfo.BuilderID}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El constructor ${domain} ha sido suspendido.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              dispatch(clearDataConstructor());
              dispatch(StartSearchConstructor(domain));
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status !== 201) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
        }
      });
  };

  const handleChangeUnsuspend = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        `${SERVER_URL}/api/v1/constructor/unSuspend/${constructorInfo.BuilderID}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El constructor ${domain} ha sido habilitado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              dispatch(clearDataConstructor());
              dispatch(StartSearchConstructor(domain));
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status !== 201) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setRemoving(true);

    axios
      .delete(
        `${SERVER_URL}/api/v1/constructor/delete/${constructorInfo.BuilderID}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("resp", res);
        setRemoving(false);
        if (res.status === 200) {
          Swal.fire({
            title: "Éxito",
            icon: "success",
            text: `El constructor ${domain} ha sido eliminado.`,
            button: "OK",
          }).then((res) => {
            if (res.value) {
              dispatch(clearDataConstructor());
              dispatch(StartSearchConstructor(domain));
            }
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        if (err.response.status !== 200) {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: err.response.data.header.errorMessage,
            button: "OK",
          });
          dispatch(setError(err.response.data.header.errorMessage));
        }
      });
  };

  return (
    <div className="container_serviceData">
      <div className="container_serviceData_title">
        <b>Datos del servicio</b>
        <b>
          Plan{" "}
          {!constructorInfo.isLoaded ? "******" : constructorInfo.BuilderType}
        </b>
      </div>

      <div className="container_serviceData_content">
        <b style={{ marginRight: "20px" }}>Estado:</b>
        <p>
          {constructorInfo
            ? constructorInfo.BuilderState === "Active" ||
              constructorInfo.BuilderState === "Registered"
              ? "Activo"
              : constructorInfo.BuilderState === "Pending Delete" ||
                constructorInfo.BuilderState === "Pending_delete"
              ? "Pendiente de Eliminación"
              : constructorInfo.BuilderState === "Suspended"
              ? "Suspendido"
              : constructorInfo.BuilderState === "Delete"
              ? "Eliminado"
              : constructorInfo.BuilderState === "Expired"
              ? "Expirado"
              : null
            : null}
        </p>
      </div>

      {constructorInfo.BuilderState === "Delete" ? null : (
        <>
          <div className="costumerData__cont">
            <div className="serviceData__cont--left">
              <div className="container_serviceData_content">
                <b style={{ marginRight: "16px" }}>Fecha de Registro:</b>
                <p>
                  {!constructorInfo.isLoaded
                    ? "******"
                    : moment(constructorInfo.BuilderDateRegister)
                        .locale("es")
                        .format("LL")}
                </p>
              </div>
              <div className="container_serviceData_content">
                <b style={{ marginRight: "16px" }}>Fecha de Vencimiento:</b>
                <p>
                  {!constructorInfo.isLoaded
                    ? "******"
                    : moment(constructorInfo.BuilderDateExpiret)
                        .locale("es")
                        .format("LL")}
                </p>
              </div>
            </div>

            <div className="costumerData__cont--right">
              <div className="costumerData__cont--buttons">
                {superuser === "SUPERUSER" ||
                hdr === "SOPORTEHDR" ||
                desarrollo === "DESARROLLO" ? (
                  constructorInfo.BuilderState ===
                  "Suspended" ? null : !loading ? (
                    <div className="bttn__container">
                      <p className="textBtn suspend">
                        <b>Suspender</b>
                      </p>
                      <button
                        className="button__suspende"
                        onClick={(e) => handleChangeSuspend(e)}
                        disabled={constructorInfo.BuilderState === "Suspended"}
                      >
                        <AiFillLock />
                      </button>
                    </div>
                  ) : (
                    <div className="loader_config">
                      <Loader />
                    </div>
                  )
                ) : undefined}

                {superuser === "SUPERUSER" ||
                hdr === "SOPORTEHDR" ||
                desarrollo === "DESARROLLO" ? (
                  constructorInfo.BuilderState === "Suspended" ? (
                    !loading ? (
                      <div className="bttn__container">
                        <p className="textBtn unsuspend">
                          <b>Anular la suspensión</b>
                        </p>
                        <button
                          className="button__unsuspende"
                          onClick={(e) => handleChangeUnsuspend(e)}
                          disabled={
                            constructorInfo.BuilderState !== "Suspended"
                          }
                        >
                          <AiFillUnlock />
                        </button>
                      </div>
                    ) : (
                      <div className="loader_config">
                        <Loader />
                      </div>
                    )
                  ) : null
                ) : undefined}

                {superuser === "SUPERUSER" ||
                hdr === "SOPORTEHDR" ||
                desarrollo === "DESARROLLO" ? (
                  !removing ? (
                    <div className="bttn__container">
                      <p className="textBtn delete">
                        <b>Eliminar</b>
                      </p>
                      <button
                        className="button__delete"
                        onClick={(e) => handleDelete(e)}
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="loader_config">
                      <Loader />
                    </div>
                  )
                ) : undefined}
              </div>
            </div>

            {/*  <p>Editar</p>
        <button
          onClick={() => setModalEditDataDomain(!modalEditDataDomain)} 
          className="button__edit"
        >
          <FaEdit />
        </button>
       <Modal
          status={modalEditDataDomain}
          changeStatus={setModalEditDataDomain}
          modalTitle="Cambio de Datos de Dominio"
          modalDetail="Id. Servicio 85229"
        >
          <ModalFormEditDataDomain />
        </Modal> */}
          </div>
        </>
      )}
    </div>
  );
};
