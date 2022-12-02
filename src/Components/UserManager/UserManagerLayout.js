import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import { SERVER_URL } from "../../util/TabNav/Access/Access";
import Modal from "../Principal/Modal/Modal";
import ModalCreateNewUser from "./ModalCreateUser/ModalCreateNewUser";
/* import { ModalUpdatePassword } from "./ModalPassword/ModalUpdatePassword"; */
import ContainerSection from "../Principal/ContainerSection";
import SimpleSearchUser from "./SimpleSearchUser";
import TableUserManager from "./TableUserManager";

import { FaPlus } from "react-icons/fa";
import "../../Styles/UserManager/UserManagerLayout.css";

export const UserManagerLayout = () => {
  const [users, setUsers] = useState([]);
  const [modalCreateUser, setModalCreateUser] = useState(false);
  /* const [modalUpdatePassword, setModalUpdatePassword] = useState(false); */
  const [search, setSearch] = useState("");

  let searchUsers = [];

  if (!search.length >= 1) {
    searchUsers = users;
  } else {
    searchUsers = users.filter((user) => {
      const userText = user.name.toLowerCase();
      const textSearch = search.toLocaleLowerCase();
      return userText.includes(textSearch);
    });
  }

  useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(`${SERVER_URL}/api/v1/auth/users`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.body);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [setUsers]);

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const adm = authData.data.roles;

  return (
    <>
      <SimpleSearchUser search={search} setSearch={setSearch} />

      <ContainerSection title="Registro de Usuarios">
        <div></div>
        <div className="general">
          <div className="itemContainer">
            {searchUsers.length > 0 &&
              searchUsers.map((user) => {
                return <TableUserManager user={user} key={uniqueId()} />;
              })}
          </div>

          <div className="itemContainerBotton">
            {adm === "SUPERUSER" && (
              <>
                <p className="itemContainerBotton__buttons--plustext">
                  Crear nuevo usuario
                </p>
                <button className="itemContainerBotton__buttons--plus">
                  <div
                    onClick={() => setModalCreateUser(!modalCreateUser)}
                    className="itemContainerBotton__buttons--plusIcon"
                  >
                    <FaPlus />
                  </div>
                </button>
                <Modal
                  status={modalCreateUser}
                  changeStatus={setModalCreateUser}
                  modalTitle="Crear Nuevo Usuario"
                >
                  <ModalCreateNewUser changeStatus={setModalCreateUser} />
                </Modal>
              </>
            )}
          </div>

          {/* <div className="itemContainerBotton">
            {adm === "SUPERUSER" && (
              <>
                <p className="itemContainerBotton__buttons--plustext">
                  Crear nuevo usuario
                </p>
                <button className="itemContainerBotton__buttons--plus">
                  <div
                    onClick={() => setModalUpdatePassword(!modalUpdatePassword)}
                    className="itemContainerBotton__buttons--plusIcon"
                  >
                    <FaPlus />
                  </div>
                </button>
                <Modal
                  status={modalUpdatePassword}
                  changeStatus={setModalUpdatePassword}
                  modalTitle="Actualizar mi Contraseña"
                >
                  <ModalUpdatePassword changeStatus={setModalUpdatePassword} />
                </Modal>
              </>
            )}
          </div> */}
        </div>
      </ContainerSection>
    </>
  );
};

const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );
};
