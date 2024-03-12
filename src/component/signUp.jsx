import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (formData.email === "") {
      setValid(true);
      setError("it should not be empty");
    } else if (!emailRegex.test(formData.email)) {
      setValid(true);
      setError("enter valid email");
    }
    if (formData.name === "") {
      setValid(true);
      setError("it should not be empty");
    }

    if (formData.password.length < 8) {
      setValid(true);
      setError("it should be atLeast 8 characters long");
    } else if (formData.password === "") {
      setValid(true);
      setError("it should not be empty");
    }

    if (formData.confirmPassword !== formData.password) {
      setValid(true);
      setError("confirm password doesn't match");
    } else if (formData.confirmPassword === "") {
      setValid(true);
      setError("it should not be empty");
    }
  }, [formData]);
  // useEffect(() => {}, [formData.email]);
  // useEffect(() => {}, [formData.role]);
  // useEffect(() => {}, [formData.password]);
  // useEffect(() => {}, [formData.confirmPassword]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    
    if (name === "name") {
      setFormData.name(value);
    } else if (name === "email") {
      setFormData.email(value);
    } else if (name === "role") {
      setFormData.role(value);
    } else if (name === "password") {
      setFormData.password(value);
    } else if (name === "confirmPassword") {
      setFormData.confirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container d-flex align-items-center justify-content-center">
        <Form id="Form" onSubmit={handleSubmit}>
          <h2 className="textSignIn">Sign Up</h2>
          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          {valid && (
            <div>
              <span className="text-danger">{error}</span>
            </div>
          )}
          <Form.Group controlId="formGridEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          {error && (
            <div>
              <span className="text-danger">{}</span>
            </div>
          )}
          <Form.Group as={Col} className="mb-2" controlId="formGridState">
            <Form.Label className="label">Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
          {error && (
            <div>
              <span className="text-danger">{}</span>
            </div>
          )}
          <Form.Group controlId="formGridPassword" className="mb-2">
            <Form.Label className="label"> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          {error && (
            <div>
              <span className="text-danger">{}</span>
            </div>
          )}
          <Form.Group controlId="formGridConfirmPassword" className="mb-3">
            <Form.Label className="label"> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          {error && (
            <div>
              <span className="text-danger">{}</span>
            </div>
          )}
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
