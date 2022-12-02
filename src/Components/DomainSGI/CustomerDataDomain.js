import React from "react";
import { useSelector } from "react-redux";

/* , FaEdit, FaPeopleCarry */
import { FaUserAstronaut } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

import "../../Styles/DomainSGI/CustomerDataDomain.css";

export const CustomerDataDomain = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);

  return (
    <>
      <div className="data__container">
        <div className="costumerData__header">
          <div className="costumerData__header--left">
            <div className="costumerData__header--icon">
              <FaUserAstronaut />
            </div>
            <div>
              <p className="costumerData__header--name">
                {!domainInfo.isLoaded
                  ? "***************"
                  : `${domainInfo.DataContact[0].NameClient} ${domainInfo.DataContact[0].LastName === 'UNDEFINED' ? "" : domainInfo.DataContact[0].LastName}`}
              </p>
            </div>
            <div className="costumerData__header--circle">
              <BsCircleFill />
            </div>
          </div>

        </div>

        <div className="costumerData__content">
          <div className="costumerData__content--left">
            <div className="costumerData__content--titles">
              <p>Identificación:</p>
              <p>Correo:</p>
            </div>
            <div className="costumerData__content--data">
              <p>
                {!domainInfo.isLoaded
                  ? "*****"
                  : domainInfo.DataContact[0].Identification === '' ? "******" : domainInfo.DataContact[0].Identification}
              </p>
              <p>
                {!domainInfo.isLoaded
                  ? "*****"
                  : domainInfo.DataContact[0].Email}
              </p>
            </div>
          </div>
          {/* <div className="costumerData__content--right">
            <div className="costumerData__content--buttons">
              <div className="customerdatadom_button__container">
                <button onClick={() => setModalEditData(!modalEditData)} className="button__coupons">
                      <FaEdit />
                    </button>
                    <Modal
                      status={modalEditData}
                      changeStatus={setModalEditData}
                      modalTitle="Cambio de Datos de Cliente"
                      modalDetail="Id. Servicio 85229"
                    >
                    <ModalFormEditData/>
                    </Modal>
              </div>

              <div className="customerdatadom_button__container">
                <p className="textCoupons">Mover dominio</p>
                <button
                      onClick={() => setModalMoveDomain(!modalMoveDomain)}
                      className="button__addFunds"
                    >
                      <FaPeopleCarry />
                    </button>
                    <Modal
                      status={modalMoveDomain}
                      changeStatus={setModalMoveDomain}
                      modalTitle="Mover Dominio entre Clientes"
                      modalDetail="Id. Servicio 85229"
                    >
                      <ModalMoveDomain />
                    </Modal>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
