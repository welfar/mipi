import React from "react";

import { DomainLogicLayout } from "../Components/DomainLogic/DomainLogicLayout";
import LayoutCompleted from "../Components/Principal/LayaoutComplete";

export const DomainLogic = () => {
  return (
    <LayoutCompleted view="Administración Zonas Migradas Logic">
      <DomainLogicLayout />
    </LayoutCompleted>
  );
};
