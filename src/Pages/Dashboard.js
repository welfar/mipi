import React from "react";

import LayoutCompleted from "../Components/Principal/LayaoutComplete";
import { DashboardLayout } from "../Components/Dashboard/DashboardLayout";

export const Dashboard = () => {
  return (
    <LayoutCompleted view="Servicios">
      <DashboardLayout />
    </LayoutCompleted>
  );
};
