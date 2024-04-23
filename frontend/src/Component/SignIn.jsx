import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/signIn-signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { SET_NAME } from "../Constant/constant";
import axiosInstance from "../utils/axiosInstance";
import { loginSuccess, loginFailure } from "../store/authSlice";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const onSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post(`/submit/login`, formData);
      const { success, message, accessToken, refreshToken, user } =
        response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (success) {
        dispatch(loginSuccess(user));
        SET_NAME(user.name);
        navigate("/dashboard");
      } else {
        return "Login failed", message;
      }
    } catch (error) {
      setFormErrors({ password: "Invalid credentials" });
      console.error("Error fetching data:", error);
      dispatch(loginFailure("Error fetching data:", error.message));
    }
  };

  return (
    <>
      <header className="header">
        <h3 className="headerText">Blog app in React </h3>
      </header>
      <div className="container formContainer d-flex align-items-center justify-content-center">
        <Form id="Form" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">Email is required</span>
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
                {...register("password", { required: true })}
              />
              {errors.password && !formErrors.password && (
                <span className="text-danger">Password is required</span>
              )}
              {formErrors.password && (
                <span className="text-danger">{formErrors.password}</span>
              )}
            </Col>
          </Form.Group>
          <Button variant="primary" className="w-100 mt-3" type="submit">
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
