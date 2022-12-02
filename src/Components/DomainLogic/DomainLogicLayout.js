import React from "react";
import { useSelector } from "react-redux";

import { BsCircleFill } from "react-icons/bs";
import { SimpleSearchDomain } from "../DomainSGI/SimpleSearchDomain";
import { ContainerSectionPersonalize } from "../DomainSGI/ContainerSectionPersonalize";
import { NameServers } from "./NameServers";
import { DNSRegister } from "./DNSRegister";

import "../../Styles/DomainSGI/DomainSGILayout.css";

export const DomainLogicLayout = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);
  const searchFinish = useSelector((state) => state.ui.searchFinish);

  return (
    <>
      <SimpleSearchDomain />

      {!searchFinish ? null : (
        <ContainerSectionPersonalize
          title={
            !domainInfo.isLoaded
              ? `Administración de dominio: ***** `
              : `Administración de dominio: ${domainInfo.NameDomain}`
          }
        >
          <div className="costumerData__header--circle">
            <BsCircleFill />
          </div>
          <div>
            <>
              <NameServers />

              <DNSRegister />
            </>
          </div>
        </ContainerSectionPersonalize>
      )}
    </>
  );
};
