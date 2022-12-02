import { Route, Routes } from "react-router-dom";

import { Dashboard } from "../Pages/Dashboard";
import { MiConstructor } from "../Pages/MiConstructor";
import { Customers } from "../Pages/Customers";
import { DomainSGI } from "../Pages/DomainSGI";
import { Orders } from "../Pages/Orders";
import { UserManager } from "../Pages/UserManager";
import { Reports } from "../Pages/Reports";

export const AppRoutes = () => {
  const authData = JSON.parse(sessionStorage.getItem("PIUSER"));

  const superuser = authData.data.roles;
  return (
    <>
      <Routes>
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/MiConstructor" element={<MiConstructor />} />
        <Route exact path="/Customers" element={<Customers />} />
        <Route exact path="/DomainSGI" element={<DomainSGI />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/Reports" element={<Reports />} />
        <Route
          exact
          path="/UserManager"
          element={
            superuser === "SUPERUSER" ? (
              <UserManager />
            ) : (
              "!!!Upsss... Deber ser super usuario para acceder a esta vista. Regresa a la página anterior para seguir navegando"
            )
          }
        />
      </Routes>
    </>
  );
};
