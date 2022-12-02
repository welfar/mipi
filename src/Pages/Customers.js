import React from "react";
import LayoutCompleted from "../Components/Principal/LayaoutComplete";
import { CustomersLayout } from "../Components/Customers/CustomersLayout";

export const Customers = () => {
  return (
    <>
      <LayoutCompleted view="Clientes">
        <CustomersLayout />
      </LayoutCompleted>
    </>
  );
};
