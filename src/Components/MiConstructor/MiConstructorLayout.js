import React, { useState } from "react";
import { useSelector } from "react-redux";

import { SimpleSearchMiConstructor } from "./SimpleSearchMiConstructor";
import ContainerSection from "../Principal/ContainerSection";
import { CustomerDataMiConstructor } from "./CustomerDataMiConstructor";
import { ContainerSectionPersonalize } from "../DomainSGI/ContainerSectionPersonalize";
import { ServiceData } from "./ServiceData";

export const MiConstructorLayout = () => {
  const constructorInfo = useSelector((state) => state.constructorInfo);
  const [domain, setDomain] = useState("");
  return (
    <>
      <SimpleSearchMiConstructor
        Query="Consulta aquí los detalles de Mi Constructor"
        Typequery="Ingresa un dominio para realizar la consulta"
        TitleButton="Buscar"
        domain={domain}
        setDomain={setDomain}
      />

      {!constructorInfo.isLoaded ? null : (
        <ContainerSection title="Datos del Cliente Asociado a Mi Constructor">
          <div></div>
          <CustomerDataMiConstructor />
        </ContainerSection>
      )}

      {!constructorInfo.isLoaded ? null : (
        <ContainerSectionPersonalize
          title={`Administración Mi Constructor: ${
            !constructorInfo.isLoaded ? "******" : constructorInfo.BuilderDomain
          }`}
        >
          <div></div>

          <ServiceData domain={domain} />
        </ContainerSectionPersonalize>
      )}
    </>
  );
};
