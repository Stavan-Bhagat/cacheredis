import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Container } from "react-bootstrap";
const Sidebar = () => {
  return (
    <>
      <Col sm={2} className="sideBar">
        <Container className="d-flex align-items-center justify-content-center SidebarContainer">
          <div>
            <div className="mb-3">
              <Link to="/blog">
                <Button variant="outline-info">Blog</Button>
              </Link>
            </div>
            <div>
              <Link to="/dashboard">
                <Button variant="outline-light">Dashboard</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Col>
    </>
  );
};

export default Sidebar;
