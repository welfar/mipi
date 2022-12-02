import React from "react";
import { useSelector } from "react-redux";

import ContainerSection from "../Principal/ContainerSection";
import { SimpleSearchDomain } from "./SimpleSearchDomain";
import { ContainerSectionPersonalize } from "./ContainerSectionPersonalize";
import { CustomerDataDomain } from "./CustomerDataDomain";
import { DomainData } from "./DomainData";
import { DomainContactDetails } from "./DomainContactDetails";
import { NameServers } from "./NameServers";

import "../../Styles/DomainSGI/DomainSGILayout.css";
import { BsCircleFill } from "react-icons/bs";
import { DNSRegister } from "./DNSRegister";

export const DomainSGILayout = () => {
  const domainInfo = useSelector((state) => state.domainsInfo);

  return (
    <>
      <SimpleSearchDomain />

      {!domainInfo.isLoaded ? null : (
        <ContainerSection title= {`Datos del Cliente Asociado al Dominio` } >
          
          <div><p>{domainInfo.DataContact[0].DomainPlatform} </p></div>
          <div>
            {" "}
            <CustomerDataDomain />
          </div>
        </ContainerSection>
      )}

      {!domainInfo.isLoaded ? null : (
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
              <DomainData />

              <DomainContactDetails />

              <NameServers />

              <DNSRegister />
            </>
          </div>
        </ContainerSectionPersonalize>
      )}
    </>
  );
};
