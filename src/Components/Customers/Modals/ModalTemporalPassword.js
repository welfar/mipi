import React from "react";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { SERVER_URL } from "../../../util/TabNav/Access/Access";
import { FaRegCopy } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

import "../../../Styles/Customers/Modals/ModalTemporalPassword.css";

const ModalTemporalPassword = ({ password, setPassword }) => {
  const customerInf = useSelector((state) => state.customerInfo);

  const IdLogic = customerInf.DataClient[0].CustomerId;

  const cookies = new Cookies();

  const handleRefresh = () => {
    axios
      .get(`${SERVER_URL}/api/v1/customers/temporalPass/${IdLogic}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setPassword(res.data.body[0].TemporalPass.split(""));
      })
      .catch((err) => {
        console.log("error", err);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.header.errorMessage,
          button: "OK",
        });
      });
  };

  /* const copy = () => {
     if (navigator.clipboard) {
      navigator.clipboard.writeText(password.join(""));
      toast.success("Copiado al portapapeles!");
    } else  <CopyToClipboard text={password.join("")}></CopyToClipboard>;
    toast.success("Copiado al portapapeles!");
    } 
  }; */

  return (
    <div className='temporalPassword_container modal__container'>
      <div className='temporalPassword_viewRefresh'>
        {password.map((item, index) => {
          return (
            <p className='temporalPassword_item' key={index}>
              {item}
            </p>
          );
        })}

        <FiRefreshCw
          size={25}
          className='refreshIcon'
          title='Refrescar'
          onClick={() => handleRefresh()}
        />

        <div className='copyBtn_container'>
          <CopyToClipboard text={password.join("")}>
            <button
              className='copyBtn'
              title='Copiar'
              onClick={() => toast.success("Copiado al portapapeles!")}
            >
              <FaRegCopy />
            </button>
          </CopyToClipboard>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default ModalTemporalPassword;
