import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { isExpired } from "react-jwt";

import { Col, Dropdown, Row } from "react-bootstrap";
import { logoutAction } from "../../actions/auth";
import { setError } from "../../actions/ui";
import "../../Styles/Principal/Header.css";

const Header = ({ view }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.data);

  const Logout = () => {
    if (dispatch(logoutAction())) {
      window.location.reload();
    }
  };

  const cookies = new Cookies();
  const sesion = cookies.get("token");

  if (sesion) {
    if (isExpired(sesion)) {
      dispatch(logoutAction());
      dispatch(
        setError("Su sesión ha expirado, por favor vuelva a iniciar sesión")
      );
    }
  }

  return (
    <>
      <div className="header__background">
        <Row className="align__title">
          <Col md={9} sm={6} className="hd_col">
            <span className="header__title header__title--hiden">
              Bienvenido al panel de {view}
            </span>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Dropdown>
              <Dropdown.Toggle
                className="header_buttom__container"
                id="dropdown-button"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
                  alt="Dominios Hosting Correos Corporativos Certificados Digitales Colombia"
                  className="img_user img-fluid"
                />
                {userInfo.nombre}
              </Dropdown.Toggle>

              <Dropdown.Menu className="my_dropdown">
                <Dropdown.Item href="#/action-2">Mi cuenta</Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.preventDefault();
                    Logout();
                  }}
                >
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
