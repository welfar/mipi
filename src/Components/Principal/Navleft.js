import React, { Component } from "react";
import { Link } from "react-router-dom";

import { VscCircuitBoard } from "react-icons/vsc";
import { Col, Row } from "react-bootstrap";

import "../../Styles/Principal/Navleft.css";

class Navleft extends Component {
  constructor(props) {
    super(props);
    const authData = JSON.parse(sessionStorage.getItem("PIUSER"));
    const adm = authData.data.roles;
    this.state = {
      currentUrl: "",
      views: [
        /*  
        {
          icon: "fa-file-invoice-dollar",
          view: "Billing",
          label: "Facturación",
        },
        {
          icon: "fa-headset",
          view: "Support",
          label: "Soporte",
        },
        {
          icon: "fa-tags",
          view: "Products",
          label: "Productos",
        },
        {
          icon: "fa-mail-bulk",
          view: "Mail",
          label: "Correo",
        },
        {
          icon: "fas fa-donate",
          view: "Prices",
          label: "Precios",
        },
        {
          icon: "fa-hands-helping",
          view: "Commercial",
          label: "Comercial",
        },
        {
          icon: "fa-project-diagram",
          view: "Processes",
          label: "Procesos",
        }, */
        {
          icon: "fa-chart-bar",
          view: "Dashboard",
          label: "Dashboard",
        },
        {
          icon: "fas fa-laptop-code",
          view: "MiConstructor",
          label: "Mi Constructor",
        },
        {
          icon: "fas fa-users-cog",
          view: "Customers",
          label: "Clientes",
        },
        {
          icon: "fa-shopping-basket",
          view: "Orders",
          label: "Órdenes",
        },
        {
          icon: "fa-clipboard",
          view: "Reports",
          label: "Reportes",
        },
        {
          icon: "fas fa-globe",
          view: "DomainSGI",
          label: "Dominios",
        },
        /*  {
          icon: "fa-network-wired",
          view: "DomainLogic",
          label: "Zonas Migradas",
        }, */
        adm === "SUPERUSER"
          ? {
              icon: "fas fa-users-cog",
              view: "UserManager",
              label: "Usuarios",
            }
          : {},
      ],
    };
  }

  componentDidMount() {
    //traemos la url actual para pintar el navItem actual
    const url = window.location.toString();
    const loc = url.split("#");
    const newurl = loc[0].split("/");
    this.setState({
      currentUrl: newurl[3],
    });
  }

  render() {
    const { currentUrl, views } = this.state;

    const { handleNavleft, navleftHide } = this.props;

    return (
      <React.Fragment>
        <div className="navbar__title--container no-seleccionar">
          {navleftHide ? (
            <Col md={12} xs={12} className="p-0 item_centrar">
              <div
                onClick={() => handleNavleft()}
                className="container__svg--title"
              >
                <VscCircuitBoard />
              </div>
            </Col>
          ) : (
            <>
              <Col
                md={9}
                className="pl-0 mt-1 navbar__title--hide nl text-right "
              >
                <span className="navbar__title">Panel Interno</span>
                <br />
                <span className="navbar__subtitle">Mi.com.co</span>
              </Col>
              <Col md={3} className="p-0 item_centrar">
                <div
                  onClick={() => handleNavleft()}
                  className="container__svg--title"
                >
                  <VscCircuitBoard />
                </div>
              </Col>
            </>
          )}
        </div>

        {navleftHide
          ? views.map((view, index) => {
              return (
                <NavItemHide
                  key={index}
                  icon={`fas ${view.icon}`}
                  view={`/${view.view}`}
                  selected={currentUrl === view.view}
                />
              );
            })
          : views.map((view, index) => {
              return (
                <NavItem
                  key={index}
                  icon={`fas ${view.icon}`}
                  view={`/${view.view}`}
                  label={view.label}
                  selected={currentUrl === view.view}
                />
              );
            })}
      </React.Fragment>
    );
  }
}

class NavItemHide extends Component {
  render() {
    const { icon, view, selected } = this.props;

    return (
      <React.Fragment>
        <div className="navbar__paddingLeft">
          {selected ? (
            <div className="item__navbar--selected">
              <Link
                className="cursor__pointer label__link--selected item_centrar"
                to={view}
              >
                <i className={`${icon} icon__size icon__color--selected`} />
              </Link>
            </div>
          ) : (
            <div className="item__navbar--container">
              <Link
                className="cursor__pointer label__link item_centrar"
                to={view}
              >
                <i className={`${icon} icon__size`} />
              </Link>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

class NavItem extends Component {
  render() {
    const { icon, view, selected, label } = this.props;

    return (
      <React.Fragment>
        <div className="navbar__paddingLeft">
          {selected ? (
            <div className="item__navbar--selected">
              <Link className="cursor__pointer label__link--selected" to={view}>
                <Row className="centrar">
                  <Col md={3} xs={12} className="centrar">
                    <i className={`${icon} icon__size icon__color--selected`} />
                  </Col>
                  <Col md={9} className="navbar__title--hide nl">
                    <span className="title-link no-seleccionar nth">
                      {label}
                    </span>
                  </Col>
                </Row>
              </Link>
            </div>
          ) : (
            <div className="item__navbar--container">
              <Link to={view} className="cursor__pointer label__link">
                <Row className="centrar">
                  <Col md={3} xs={12} className="centrar">
                    <i className={`${icon} icon__size`} />
                  </Col>
                  <Col md={9} className="navbar__title--hide nl">
                    <span className="title-link no-seleccionar nth">
                      {label}
                    </span>
                  </Col>
                </Row>
              </Link>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Navleft;
