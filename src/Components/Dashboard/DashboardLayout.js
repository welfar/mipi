import React, { useState } from "react";

import { DashboardHeader } from "./DashboardHeader";
import ContainerSection from "../Principal/ContainerSection";
import { Tab } from "../../util/TabNav/Tab";

import "../../Styles/Dashboard/DashboardLayout.css";
import { TabNav } from "../../util/TabNav/TabNav";
import { CardServices } from "./CardServices";

export const DashboardLayout = () => {
  const [selected, setSelected] = useState("Resumen día");
  /* const [reportSelected, setReportSelected] = useState("Resumen día"); */

  return (
    <>
      <div className="dashboard__container">
        <DashboardHeader />

        <ContainerSection title="Servicios">
          <div></div>
          <div className="servicesContainer">
            <TabNav
              tabs={["Resumen día", "Mes", "Historial"]}
              selected={selected}
              setSelected={setSelected}
            >
              <Tab isSelected={selected === "Resumen día"}>
                <div className="tabs__container">
                  <CardServices
                    title="Total Servicios"
                    text1="Registros"
                    text2="Renovación"
                    text3="Cumplido"
                  />
                  <CardServices
                    title="Registros Hoy"
                    text1="Dominios"
                    text2="Correos"
                    text3="Hosting"
                  />
                  <CardServices
                    title="Renovaciones Hoy"
                    text1="Dominios"
                    text2="Correos"
                    text3="Hosting"
                  />
                </div>
              </Tab>

              <Tab isSelected={selected === "Mes"}>
                <h1>Mes</h1>
              </Tab>

              <Tab isSelected={selected === "Historial"}>
                <h1>Historial</h1>
              </Tab>
            </TabNav>
          </div>
        </ContainerSection>
      </div>
    </>
  );
};
