import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../store/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/users");
      const existingUsers = response.data;
      const user = existingUsers.find(
        (element) => email === element.email && password === element.password
      );
      if (user) {
        localStorage.setItem("role", user.role);
        dispatch(loginSuccess(user));
        navigate("/dashboard");
      } else {
        setErrors({ ...errors, password: "Invalid email or password." });
        dispatch(loginFailure("Invalid email or password."));
      }
    } catch (error) {
      console.error("Error posting data:", error);
      dispatch(loginFailure("Error posting data:", error.message));
    }
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const newErrors = { ...errors };

    if (email === "") {
      newErrors.email = "Email should not be empty";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    } else {
      newErrors.email = "";
    }

    if (password === "") {
      newErrors.password = "Password should not be empty";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
  }, [email, password]);

  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container formContainer d-flex align-items-center justify-content-center">
        <Form id="Form" onSubmit={handleSubmit}>
          <h2 className="textSignIn">Sign In</h2>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label className="label" column sm={12}>
              Email
            </Form.Label>
            <Col sm={12}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
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
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </Col>
          </Form.Group>
          <Button className="signIn mt-3" type="submit">
            Sign In
          </Button>{" "}
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
