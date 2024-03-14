import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Col, Row,   Container } from "react-bootstrap";
import Sidebar from "./sidebar";
const Blog = () => {
  return (
    <>
      <header className="header">
        <h3 className="headerText ">
          Blog app in React
          <NavDropdown
            className="float-end text-white fs-5"
            title="Options"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/1">Logout</NavDropdown.Item>
          </NavDropdown>
        </h3>
      </header>
      <Container fluid className="dashboardContainer">
        <Row>
          <Sidebar />
          <Col sm={10}>
            {" "}
            <section className="mt-3">
              <div></div>
              <div className="container">
              
              </div>
            </section>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Blog;
