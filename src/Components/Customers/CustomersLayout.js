import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import { CustomerSearch } from "./CustomerSearch";
import { CustomerData } from "./CustomerData";
import { ServicesContainer } from "./ServicesContainer";
import { ItemDomains } from "./ItemDomains";
import { SERVER_URL } from "../../util/TabNav/Access/Access";
import ContainerSection from "./../Principal/ContainerSection";
/* import { ItemTransDomain } from "./ItemTransDomain"; */
/*import { ItemTransServices } from "./ItemTransServices";*/
import { ItemServices } from "./ItemServices";
/* import { FaExchangeAlt } from "react-icons/fa"; */

import "../../Styles/Customers/CustomersLayout.css";

export const CustomersLayout = () => {
  const searchFinish = useSelector((state) => state.ui.searchFinish);
  const customerInf = useSelector((state) => state.customerInfo);

  const [itemsDomain, setItemsDomain] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [itemsService,setItemsService] = useState([]);

  let clearDomains = [];
  let searchDomains = [];

  let clearServices = [];
  let searchServices = [];

  if (!search.length >= 1) {
    searchDomains = itemsDomain;
  } else {
    searchDomains = itemsDomain.filter((domName) => {
      const domainText = domName.DomainName.toLowerCase();
      const textSearch = search.toLocaleLowerCase();
      return domainText.includes(textSearch);
    });

  }


  if (!search2.length >= 1) {
    searchServices = itemsService;
  } else {
    searchServices = itemsService.filter((domName) => {
      const domainText = domName.domainName.toLocaleLowerCase();
      const textSearch = search2.toLocaleLowerCase();
      return domainText.includes(textSearch);
    });
  }


  /*   const [transactionsDomain, setTransactionsDomain] = useState(false); */
  /* const [transactionsServices, setTransactionServices] = useState(false); */

  /* const btnTransactionsDomains = () => {
    setTransactionsDomain(!transactionsDomain);
  }; */

  /* const btnTransactionsServices = () => {
    setTransactionServices(!transactionsServices);
  }; */
  useEffect(() => {
    const cookies = new Cookies();

    setItemsDomain(clearDomains);
    setItemsService(clearServices);

    if (searchFinish && customerInf.isLoaded) {
      const IdLogic = customerInf.DataClient[0].CustomerId;
      const URL = `${SERVER_URL}/api/v1/customers/domains/${IdLogic}`;
      const URLServices = `${SERVER_URL}/api/v1/customers/products/${IdLogic}`;

      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        })
        .then((res) => {
          setItemsDomain(res.data.body);
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

        axios
        .get(URLServices, {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        })
        .then((res) => {
          setItemsService(res.data.body);
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
    }
  }, [customerInf]);

  

  return (
    <>
      <CustomerSearch
        Query="Consulta aquí los datos de un Cliente: "
        Typequery="Ingresa correo de usuario o id cliente"
        TitleButton="Buscar"
      />

      {!customerInf.isLoaded ? null : (
        <ContainerSection title="Datos del Cliente">
          <div></div>
          <div>
            <CustomerData />
          </div>
        </ContainerSection>
      )}

      {!customerInf.isLoaded ? null : (
        <div className="products__container">
          <div className="products__domain">
            <ServicesContainer
              title="Dominios"
              search={search}
              setSearch={setSearch}
            >
              {searchDomains.length > 0 &&
                searchDomains.map((item, index) => {
                  return <ItemDomains key={index} item={item} />;
                })}

              <div className="button__container">
                {/* <p className='textTransactions'>Transacciones</p> 
              <button
                onClick={btnTransactionsDomains} 
                className='button__transactions'
                disabled
              >
                <FaExchangeAlt />
              </button> */}
              </div>
            </ServicesContainer>
          </div>

          <div className="products__domain">

            <ServicesContainer
              title="Servicios"
              search={search2}
              setSearch={setSearch2}
            >
              {searchServices.length > 0 &&
                searchServices.map((item, index) => {
                  return <ItemServices key={index} item={item} />;
                })}

              <div className="button__container">
                {/* <p className='textTransactions'>Transacciones</p> 
              <button
                onClick={btnTransactionsDomains} 
                className='button__transactions'
                disabled
              >
                <FaExchangeAlt />
              </button> */}
              </div>
            </ServicesContainer>
          </div>
        </div>
      )}

      {/* <div className='products__domain'>
            <ServicesContainer title='Transacciones Dominios'>
              <div>
                <ItemTransDomain />
                <ItemTransDomain />
                <ItemTransDomain />
              </div>
              <div className='button__container'>
                <p className='textTransactions'>Dominios</p>
                <button
                  onClick={btnTransactionsDomains}
                  className='button__transactions'
                >
                  <FaExchangeAlt />
                </button>
              </div>
            </ServicesContainer>
      </div> */}
      {/* {transactionsServices ? (
          <div className='products__services'>
            <ServicesContainer title='Transacciones Servicios'>
              <div>
                <ItemTransServices />
                <ItemTransServices />
                <ItemTransServices />
                <ItemTransServices />
                <ItemTransServices />
              </div>
              <div className='button__container'>
                <p className='textTransactions'>Servicios</p>
                <button
                  onClick={btnTransactionsServices}
                  className='button__transactions'
                >
                  <FaExchangeAlt />
                </button>
              </div>
            </ServicesContainer>
          </div>
        ) : (
          <div className='products__services'>
            <ServicesContainer title='Servicios'>
              <div>
                <ItemServices />
                <ItemServices />
                <ItemServices />
                <ItemServices />
                <ItemServices />
                <ItemServices />
              </div>
              <div className='button__container'>
                <p className='textTransactions'>Transacciones</p>
                <button
                  onClick={btnTransactionsServices}
                  className='button__transactions'
                >
                  <FaExchangeAlt />
                </button>
              </div>
            </ServicesContainer>
          </div>
        )} */}
    </>
  );
};
