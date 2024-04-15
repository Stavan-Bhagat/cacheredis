import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { NavDropdown } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { USER_API, fetchUserData } from "../Services/services";
import {
  GET_SESSION_USER,
  GET_IS_LOGIN,
  REMOVE_SESSION_USER,
  REMOVE_IS_LOGIN,
} from "../Constant/constant";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const userString = GET_SESSION_USER;
  let userObject = JSON.parse(userString);
  const isLogin = GET_IS_LOGIN;
  const userRole = userObject ? userObject.role : null;
  const [role, setRole] = useState(userRole);
  console.log("role",role);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    dispatch(logout());
    REMOVE_SESSION_USER();
    REMOVE_IS_LOGIN();
    navigate("/");
  };

  useEffect(() => {
    const result=fetchUserData();
    setUsers(result.data);
  }, []);

  const handleShow = (id) => {
    console.log("Users:", users);
    const user = users.find((user) => user.id === id);
    console.log("User:", user);
    setFormData(user);
    setId(id);
    setShow(true);
    console.log(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responsePost = await axios.patch(`${USER_API}/${id}`, formData);
      console.log("Data successfully updated:", responsePost.data);
      const response = await axios.get(USER_API);
      setUsers(response.data);
      setShow(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleted = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`${USER_API}/${userId}`);
        console.log(`User deleted with ID ${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      return;
    }
  };

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
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </h3>
      </header>
      <Container fluid className="dashboardContainer">
        <Row>
          <Sidebar />

          <Col sm={10}>
            <section className="mt-3">
              <div className="container">
                <h1 className="text-white text-center">Hello, {user.name}</h1>
                {role === "admin" ? (
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleShow(user.id)}
                              disabled={
                                user.role === "admin" &&
                                user.id === userObject?.id
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => deleted(user.id)}
                              disabled={
                                user.role === "admin" &&
                                user.id === userObject?.id
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Container className="text-white ">
                    <h4>
                      Welcome to user
                      <span className="text-danger">Dashboard</span> section
                    </h4>
                  </Container>
                )}
              </div>
            </section>
          </Col>
        </Row>
      </Container>
      {/* modal start */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalTitle">
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formGridAddress1">
              <Form.Label className="modalLabel">Name</Form.Label>
              <Form.Control
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label className="modalLabel">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-2" controlId="formGridState">
              <Form.Label className="modalLabel">Role</Form.Label>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
