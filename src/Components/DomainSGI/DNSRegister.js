import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Accordion } from "react-bootstrap";
import { insertRecords } from "../../actions/records";

import { SelectList } from "./DNSRegisterSelect/SelectList";
import { RegATable } from "./RecordsTable/RegATable";
import { RegAAAATable } from "./RecordsTable/RegAAAATable";
import { RegMXTable } from "./RecordsTable/RegMXTable";
import { RegTXTTable } from "./RecordsTable/RegTXTTable";
import { RegCNAMETable } from "./RecordsTable/RegCNAMETable";
import { FaPlusCircle } from "react-icons/fa";

import styles from "./Btn.module.css";
import "../../Styles/DomainSGI/DNSRegister.css";

export const DNSRegister = () => {
  const dispatch = useDispatch();
  const domainInfo = useSelector((state) => state.domainsInfo);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [opened, setOpened] = useState(false);
  const [dns, setDns] = useState("");
  const [rrsets, setRrrsets] = useState({
    name: "",
    ttl: "3600",
    point: "",
    prior: "",
  });
  const handleNewRecord = (e) => {
    e.preventDefault();
    setRrrsets({
      ...rrsets,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDns(e.target.value);
  };

  const newRecord = (e, type, rrsets, domainName) => {
    e.preventDefault();
    const ipv4_regex =
      /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    const ipv6_regex =
      /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;
    const numbers = /^[0-9]+$/gm;

    if (rrsets.name === "") {
      setRrrsets({
        ...rrsets,
        name: "@",
      });
    }
    if (rrsets.name === "@" && type === "CNAME") {
      alert(
        "Accion no permitida. no puedes crear un registro CNAME con un host @, usa un registro alias"
      );
      return;
    }
    if (rrsets.point === "" || rrsets.point === null) {
      alert("No se puede crear un registro sin apuntamiento");
      return;
    }
    if (type === "A" && !ipv4_regex.test(rrsets.point)) {
      alert("El apuntamiento debe ser una IPv4 valida para el registro A");
      return;
    }
    if (type === "AAAA" && !ipv6_regex.test(rrsets.point)) {
      alert("El apuntamiento debe ser una IPv6 valida para el registro AAAA");
      return;
    }
    if (type === "MX" && !numbers.test(rrsets.prior)) {
      alert("Se requiere un numero para el campo prioridad");
      return;
    }
    dispatch(insertRecords(type, rrsets, domainName));
    setRrrsets({
      ...rrsets,
      name: "",
      point: "",
      prior: "",
    });
  };

  const arrowUp = {
    transform: "rotate(180deg)",
  };

  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const adm = authData.data.roles.split(",")[0];
  const lider = authData.data.roles.split(",")[1];
  const maia = authData.data.roles.split(",")[0];
  const hdr = authData.data.roles.split(",")[0];

  return (
    <div className="container__dnsregister">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            className={styles.accordion__header}
            onClick={() => {
              opened ? setOpened(false) : setOpened(true);
            }}
          >
            <div className="container__dnsReg">
              <div className="container__dnsregister--tittle">
                Registros DNS
              </div>
              <div>
                <i
                  style={opened ? arrowUp : null}
                  className="fa fa-angle-down"
                />
              </div>
            </div>
          </Accordion.Header>
          <hr className="container__hr" />
          <Accordion.Body>
            <div>
              <p className="container__dnsregister--text">
                A continuación se listan los registros DNS configurados para el
                dominio:
                <strong>
                  {!domainInfo.isLoaded ? `***** ` : `${domainInfo.NameDomain}`}
                </strong>
              </p>
              <div className="dns__reg_container_inputs">
                <SelectList handleChange={(e) => handleChange(e)} />
                {dns === "" ? null : (
                  <div className="container__add_inputs">
                    {(adm === "SUPERUSER" ||
                      lider === "LIDER" ||
                      maia === "MAIA" ||
                      hdr === "SOPORTEHDR") && (
                      <>
                        <label htmlFor="name">Nombre:</label>
                        <input
                          id="name"
                          type="text"
                          className="dns__reg_input_config"
                          name="name"
                          value={rrsets.name}
                          onChange={(e) => handleNewRecord(e)}
                        />
                        {dns === "MX" ? (
                          <>
                            <label htmlFor="prior">Prio:</label>
                            <input
                              id="prior"
                              className="dns__reg_input_config ttl"
                              type="text"
                              name="prior"
                              value={rrsets.prior}
                              onChange={(e) => handleNewRecord(e)}
                            />
                          </>
                        ) : null}
                        <label htmlFor="point">Apunta:</label>
                        <input
                          id="point"
                          type="text"
                          className="dns__reg_input_config"
                          name="point"
                          value={rrsets.point}
                          onChange={(e) => handleNewRecord(e)}
                        />
                        <label htmlFor="ttl">TTL:</label>
                        <input
                          id="ttl"
                          type="text"
                          className="dns__reg_input_config ttl"
                          name="ttl"
                          onChange={(e) => handleNewRecord(e)}
                          defaultValue={"3600"}
                        />
                        <div className="container__icon">
                          <button
                            className="container__icon_btn"
                            onClick={(e) =>
                              newRecord(e, dns, rrsets, domainInfo.NameDomain)
                            }
                            disabled={isLoading}
                          >
                            <FaPlusCircle className="dns__reg_incon" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              {dns === "A" ? (
                <RegATable domainName={domainInfo.NameDomain} />
              ) : dns === "AAAA" ? (
                <RegAAAATable domainName={domainInfo.NameDomain} />
              ) : dns === "MX" ? (
                <RegMXTable domainName={domainInfo.NameDomain} />
              ) : dns === "CNAME" ? (
                <RegCNAMETable domainName={domainInfo.NameDomain} />
              ) : dns === "TXT" ? (
                <RegTXTTable domainName={domainInfo.NameDomain} />
              ) : null}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
