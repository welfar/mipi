import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { PublicRoute } from "./PublicRoutes";
import { PrivateRoute } from "./PrivateRoutes";
import { AppRoutes } from "./AppRoutes";
import { Login } from "../Pages/Login";


import { store } from "../store/store";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/*" element={
            <PrivateRoute>
              <AppRoutes />
            </PrivateRoute>
          } />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
