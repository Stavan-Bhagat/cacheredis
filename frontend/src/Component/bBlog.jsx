import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import "../css/dashboard.css";
import axiosInstance from "../utils/axiosInstance";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";   
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { BLOG_API, fetchBlogData } from "../Services/services";
import { REMOVE_SESSION_USER } from "../Constant/constant";

const Blog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const userRole = user.role;
  const [role, setRole] = useState(userRole);
  const [formData, setFormData] = useState({
    // id: "",
    title: "",
    description: "",
  });

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleLogout = () => {
    dispatch(logout(false));
    REMOVE_SESSION_USER();
    navigate("/");
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setFormData({
      title: "",
      description: "",
    });
  };

  const handleShowUpdateModal = (id) => {
    const matchedBlog = blog.find((blog) => blog.id === id);
    setFormData({
      id: matchedBlog.id,
      title: matchedBlog.title,
      description: matchedBlog.description,
    });
    setShowUpdateModal(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/blog/addblogdata",formData);
      fetchBlogData(); 
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BLOG_API}/${formData.id}`, formData);
      fetchBlogData(setBlog); 
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BLOG_API}/${id}`);
        setBlog(blog.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    fetchBlogData()
      .then((result) => {
        setBlog(result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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
              <div className="addBlog text-center">
                <h3 className="d-inline-block text-light ">{userRole} Panel</h3>
                {role === "admin" && (
                  <Button
                    className="float-end rounded-0"
                    variant="primary"
                    onClick={handleShowAddModal}
                  >
                    Add Blog
                  </Button>
                )}
              </div>
              <div className="container">
                {role === "admin" ? (
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {blog.map((blog, index) => (
                        <tr key={blog.id}>
                          <td>{index + 1}</td>
                          <td>{blog.title}</td>
                          <td>{blog.description}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleShowUpdateModal(blog.id)}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(blog.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {blog.map((blog, index) => (
                        <tr key={blog.id}>
                          <td>{index + 1}</td>
                          <td>{blog.title}</td>
                          <td>{blog.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </section>{" "}
          </Col>
        </Row>
      </Container>

      {/* Add Blog Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton className="modalTitle">
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group className="mb-2" controlId="formGridTitle">
              <Form.Label className="modalLabel">Title</Form.Label>
              <Form.Control
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label className="modalLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAdd}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Update Blog Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton className="modalTitle">
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdate}>
            <Form.Group className="mb-2" controlId="formGridTitle">
              <Form.Label className="modalLabel">Title</Form.Label>
              <Form.Control
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label className="modalLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Update Blog Modal End */}
    </>
  );
};
export default Blog;
