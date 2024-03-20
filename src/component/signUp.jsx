import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role, password, confirmPassword } = formData;
    console.log(formData);
    console.log(errors);
    console.log(name, email, role, password, confirmPassword);
    const hasErrors = Object.values(errors).some((value) => value !== "");
    if (hasErrors) {
      console.log("Form has errors. ");
      return;
    }
    try {
      const response = await axios.get("http://localhost:3001/users");
      const existingUsers = response.data;

      const emailExists = existingUsers.some((user) => user.email === email);
      if (emailExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
        return;
      }
      const responsePost = await axios.post(
        "http://localhost:3001/users",
        formData
      );
      console.log("Data successfully posted:", responsePost.data);

      navigate("/");
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const newErrors = { ...errors };

    if (formData.email === "") {
      newErrors.email = "Email should not be empty";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    } else {
      newErrors.email = "";
    }

    if (formData.name === "") {
      newErrors.name = "Name should not be empty";
    } else {
      newErrors.name = "";
    }

    if (formData.role === "") {
      newErrors.role = "select a role";
    } else {
      newErrors.role = "";
    }

    if (formData.password === "" || formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
    } else {
      newErrors.password = "";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Confirm password doesn't match";
    } else {
      newErrors.confirmPassword = "";
    }
    setErrors(newErrors);
  }, [formData]);

  useEffect(() => {
    setErrors({
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

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
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </Form.Group>
          <Form.Group controlId="formGridEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-2" controlId="formGridState">
            <Form.Label className="label">Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option disabled selected value={""}>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
            {errors.role && <span className="text-danger">{errors.role}</span>}
          </Form.Group>
          <Form.Group controlId="formGridPassword" className="mb-2">
            <Form.Label className="label"> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridConfirmPassword" className="mb-3">
            <Form.Label className="label"> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-danger">{errors.confirmPassword}</span>
            )}
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
