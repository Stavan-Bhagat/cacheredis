import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <>
      {" "}
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container d-flex align-items-center justify-content-center">
        <Form id="Form">
          <h2 className="textSignIn">Sign Up</h2>
          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control placeholder="Name" />
          </Form.Group>
          <Form.Group controlId="formGridEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group as={Col} className="mb-2" controlId="formGridState">
            <Form.Label className="label">Role</Form.Label>
            <Form.Select aria-label="Default select example">
              <option disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formGridPassword" className="mb-2">
            <Form.Label className="label"> Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formGridConfirmPassword" className="mb-3">
            <Form.Label className="label"> Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Button variant="primary" className="w-100" type="submit">
            Submit
          </Button>
          <p className="fw-light text-black mt-2">
            already have an account? <Link to="/">Sign In</Link>
          </p>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
