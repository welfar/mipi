import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Accordion } from "react-bootstrap";

import styles from "./Btn.module.css";
import "../../Styles/DomainSGI/DomainContactDetails.css";

export const DomainContactDetails = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);

  const [opened, setOpened] = useState(false);

  const arrowUp = {
    transform: "rotate(180deg)",
  };

  return (
    <div className="container__domaincontactdetails">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            className={styles.accordion__header}
            onClick={() => {
              opened ? setOpened(false) : setOpened(true);
            }}
          >
            <div className="container__domaindetail">
              <div className="container__domaincontactdetails--tittle">
                Datos contacto de dominio
              </div>
              <div>
                <i
                  style={opened ? arrowUp : null}
                  className="fa fa-angle-down"
                />
              </div>
            </div>
          </Accordion.Header>
          <hr />
          <Accordion.Body>
            <div className="container__columns">
              <div>
                <strong>
                  <label>Registrante</label>
                </strong>
                <div className="container__inputs">
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].CompanyName
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Email
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].ContactId
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].StreetAddress
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded ? "..." : domainInfo.Contacts[0].City
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Province
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].CountryCode
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Phone1
                    }
                    disabled
                  />
                </div>

                <strong>
                  <label>Técnico</label>
                </strong>
                <div className="container__inputs">
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].CompanyName
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].Email
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].ContactId
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].StreetAddress
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded ? "..." : domainInfo.Contacts[1].City
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].Province
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].CountryCode
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[1].Phone1
                    }
                    disabled
                  />
                </div>
              </div>

              <div>
                <strong>
                  <label>Administrativo</label>
                </strong>
                <div className="container__inputs">
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].CompanyName
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Email
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].ContactId
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].StreetAddress
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded ? "..." : domainInfo.Contacts[0].City
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Province
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].CountryCode
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[0].Phone1
                    }
                    disabled
                  />
                </div>

                <strong>
                  <label>Facturación</label>
                </strong>
                <div className="container__inputs">
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].CompanyName
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].Email
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].ContactId
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].StreetAddress
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded ? "..." : domainInfo.Contacts[2].City
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].Province
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].CountryCode
                    }
                    disabled
                  />
                  <input
                    type="text"
                    className="container__columns__domainsinfo--disabled"
                    value={
                      !domainInfo.isLoaded
                        ? "..."
                        : domainInfo.Contacts[2].Phone1
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
