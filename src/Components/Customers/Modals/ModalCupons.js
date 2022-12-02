import React, { useState , useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";

import "../../../Styles/Customers/Modals/ModalCupons.css";

const ModalCupons = ({ changeStatus }) => {
  const customerInf = useSelector((state) => state.customerInfo);
  const [cupons,setCupons] = useState([]);
  const cookies = new Cookies();
  const initialState = useState({});

  useEffect(() => {
    const cookies = new Cookies();
    axios
      .get(`${SERVER_URL}/api/v1/auth/users`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setCupons(res.data.body);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [setCupons]);

  return (
    <div className="modalAddFunds_container">
      <p className="modalCupons_p">
          Cupones disponibles para {" "}
        <span style={{ fontWeight: "bolder" }}>
          {customerInf.DataClient[0].NameClient}
        </span>
      </p>

      <div className="cuponList_container">
        <div className="cupon">
          
          <p className="cupon__code">ASHDNEREJR</p>
          <p className="cupon__subtitle">Estado</p>
          <p className="cupon__subtitle">Valor</p>
          <p className="cupon__subtitle">Vigencia</p>
          <p className="cupon__subtitle">Tipo de Servicio</p>



        </div>
        
        

      </div>

      {/* <div className="modalAddFunds_btn_container">
        <button
          className="btn_confirm"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Confirmar
        </button>
      </div> */}
    </div>
  );
};

export default ModalCupons;
