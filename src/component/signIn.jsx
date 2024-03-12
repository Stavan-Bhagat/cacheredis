import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container formContainer d-flex align-items-center justify-content-center">
        <Form id="Form">
          <h2 className="textSignIn">Sign In</h2>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label className="label" column sm={12}>
              Email
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label className="label" column sm={12}>
              Password
            </Form.Label>
            <Col sm={12}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <Button className="signIn mt-3">Sign In</Button>{" "}
          <p className="fw-light text-black mt-3">
            Don't have an account? {"  "}
            <Link to="/signUp">Sign Up</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
