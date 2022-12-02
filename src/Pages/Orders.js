import React from "react";
import LayoutCompleted from "../Components/Principal/LayaoutComplete";
import { OrdersLayout } from "../Components/Orders/OrdersLayout";

export const Orders = () => {
  return (
    <LayoutCompleted view="Órdenes">
      <OrdersLayout />
    </LayoutCompleted>
  );
};
