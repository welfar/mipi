import React, { useState } from "react";

import Modal from "../Principal/Modal/Modal";
import ModalFormEditData from "./ModalUserManager/ModalFormEditData";
import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import ModalDeleteUser from "./ModalUserManager/ModalDeleteUser";
import "../../Styles/UserManager/TableUserManager.css";

const TableUserManager = ({ user }) => {
  const [modalEditData, setModalEditData] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);

  return (
    <>
      <div className="itemContainerCard">
        <div className="itemContainerCard__img">
          <img
            alt="Imagen de Usuario"
            src="https://placeimg.com/400/400/animals"
            className="itemContainerCard__img--size"
          />
        </div>

        <div className="itemContainerCard__nameUser">
          <p>{user.name}</p>
        </div>

        <div className="itemContainerCard__buttons">
          <button
            className="itemContainerCard__buttons--permissions"
            onClick={() => setModalDeleteUser(!modalDeleteUser)}
          >
            <div className="itemContainerCard__buttons--permissionsIcon">
              <FaUserMinus />
            </div>
          </button>
          <Modal
            status={modalDeleteUser}
            changeStatus={setModalDeleteUser}
            modalTitle="Eliminar Usuario"
          >
            <ModalDeleteUser changeStatus={setModalDeleteUser} user={user} />
          </Modal>

          <button
            title={user.area}
            className="itemContainerCard__buttons--permissions"
            disabled
          >
            <div className="itemContainerCard__buttons--permissionsIcon">
              <p>{user.area[0].toUpperCase()}</p>
            </div>
          </button>

          <button
            onClick={() => setModalEditData(!modalEditData)}
            className="itemContainerCard__buttons--permissions"
          >
            <div className="itemContainerCard__buttons--permissionsIcon">
              <FaUserEdit />
            </div>
          </button>
          <Modal
            status={modalEditData}
            changeStatus={setModalEditData}
            modalTitle="Cambio de Datos"
          >
            <ModalFormEditData changeStatus={setModalEditData} user={user} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default TableUserManager;
