import React from "react";

import { FaCompressArrowsAlt } from "react-icons/fa";
import "../../../Styles/Principal/Modal/Modal.css";

const Modal = ({ status, changeStatus, modalTitle, modalDetail, children }) => {
  return (
    <>
      {status && (
        <div className="modal__background">
          <div className="modal__container">
            <div className="modal__containter--header">
              <div className="modal__containter--headerone">
                <p className="header__title_modal"> {modalTitle}</p>
              </div>
              <div className="modal__containter--headertwo">
                <p className="header__detailService">{modalDetail}</p>
              </div>
            </div>

            <div className="modal__container--content">{children}</div>

            <button
              onClick={() => changeStatus(false)}
              className="modal__containter--closeButton"
            >
              <FaCompressArrowsAlt />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
