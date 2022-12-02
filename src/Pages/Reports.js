import React from "react";
import LayoutCompleted from "../Components/Principal/LayaoutComplete";
import { ReportsLayout } from "../Components/Reports/ReportsLayout";

export const Reports = () => {
  return (
    <LayoutCompleted view="Reportes">
      <ReportsLayout />
    </LayoutCompleted>
  );
};
