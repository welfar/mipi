import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Accordion } from "react-bootstrap";

import styles from "./Btn.module.css";
import "../../Styles/DomainSGI/nameServers.css";

export const NameServers = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);

  const [opened, setOpened] = useState(false);

  const arrowUp = {
    transform: "rotate(180deg)",
  };

  return (
    <div className="container__nameserver">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            className={styles.accordion__header}
            onClick={() => {
              opened ? setOpened(false) : setOpened(true);
            }}
          >
            <div className="container__namesvr">
              <div className="container__nameserver--tittle">Nameservers</div>
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
            <p className="container__nameserver--text">
              A continuación se listan los servidores de nombre configurados
              para el dominio:{" "}
              <strong>
                {!domainInfo.isLoaded ? `***** ` : `${domainInfo.NameDomain}`}
              </strong>
            </p>
            <div className="container__nameserver--input">
              <div className="container__nameserver--column">
                <strong>
                  <label
                    className="nameserver_form__container-label-input nameserver_form__container-label-input--label-config"
                    htmlFor="name"
                  >
                    Nameserver
                  </label>
                </strong>
                <input
                  type="text"
                  className="container__columns__nameservers--disabled"
                  value={!domainInfo.isLoaded ? "*****" : domainInfo.Dns[0]}
                  disabled
                />

                <strong>
                  <label
                    className="form__container-label-input form__container-label-input--label-config"
                    htmlFor="name"
                  >
                    Nameserver
                  </label>
                </strong>
                <input
                  type="text"
                  className="container__columns__nameservers--disabled"
                  value={!domainInfo.isLoaded ? "*****" : domainInfo.Dns[1]}
                  disabled
                />
              </div>

              <div className="container__nameserver--column container__nameserver--column2">
                <strong>
                  <label
                    className="form__container-label-input form__container-label-input--label-config"
                    htmlFor="name"
                  >
                    Nameserver
                  </label>
                </strong>
                <input
                  type="text"
                  className="container__columns__nameservers--disabled"
                  value={!domainInfo.isLoaded ? "*****" : domainInfo.Dns[2]}
                  disabled
                />

                <strong>
                  <label
                    className="form__container-label-input form__container-label-input--label-config"
                    htmlFor="name"
                  >
                    Nameserver
                  </label>
                </strong>
                <input
                  type="text"
                  className="container__columns__nameservers--disabled"
                  value={!domainInfo.isLoaded ? "*****" : domainInfo.Dns[3]}
                  disabled
                />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
