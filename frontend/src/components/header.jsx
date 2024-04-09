/* header component */
import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import UserServiceApi from "../api/UserServiceApi";
import { Icon } from "@iconify/react";

import "../styles/header.css";

class Header extends Component {
  render() {
    const isUserLoggedIn = UserServiceApi.isUserLoggedIn();
    const isUserStaff = UserServiceApi.isUserStaff();
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">GoTogether</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid" style={{ width: "90%" }}>
            <Nav.Link style={{ display: "flex" }} href="/">
              <Icon
                icon="ion:home-outline"
                style={{
                  color: "black",
                  alignItems: "center",
                  marginRight: "5px",
                  marginTop: "5px",
                  justifyContent: "center",
                }}
              />{" "}
              Home
            </Nav.Link>
            {isUserLoggedIn && (
              <>
                {!isUserStaff && (
                  <Nav.Link style={{ display: "flex" }} href="/locations">
                    <Icon
                      icon="mdi:plus"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    Create Trip
                  </Nav.Link>
                )}
                {!isUserStaff && (
                  <Nav.Link style={{ display: "flex" }} href="/dashboard">
                    <Icon
                      icon="ion:search-outline"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    Search Trip
                  </Nav.Link>
                )}
                {!isUserStaff && (
                  <Nav.Link style={{ display: "flex" }} href="/mybookings">
                    <Icon
                      icon="ant-design:car-outlined"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    My Trips
                  </Nav.Link>
                )}
                {isUserStaff && (
                  <Nav.Link style={{ display: "flex" }} href="/staff">
                    <Icon
                      icon="ion:user-outline"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    Admin Dashboard
                  </Nav.Link>
                )}
              </>
            )}
            {isUserLoggedIn && (
              <NavItem className="ml-auto">
                {!isUserStaff && (
                  <Nav.Link style={{ display: "flex" }} href="/myprofile">
                    <Icon
                      icon="uil:user"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    My Profile
                  </Nav.Link>
                )}
                <Nav.Link
                  style={{ display: "flex" }}
                  onClick={UserServiceApi.logout}
                >
                  <Icon
                    icon="material-symbols:logout-rounded"
                    style={{
                      color: "black",
                      alignItems: "center",
                      marginRight: "5px",
                      marginTop: "5px",
                      justifyContent: "center",
                    }}
                  />{" "}
                  Logout
                </Nav.Link>
              </NavItem>
            )}
          </Nav>
          {!isUserLoggedIn && (
            <Nav className="container-fluid" style={{ width: "80%" }}>
              <NavItem className="ml-auto">
                <>
                  <Nav.Link style={{ display: "flex" }} href="/signup">
                    <Icon
                      icon="uil:user"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    Sign Up
                  </Nav.Link>
                  <Nav.Link style={{ display: "flex" }} href="/login">
                    <Icon
                      icon="uil:user"
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginRight: "5px",
                        marginTop: "5px",
                        justifyContent: "center",
                      }}
                    />{" "}
                    Log in
                  </Nav.Link>
                </>
              </NavItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
