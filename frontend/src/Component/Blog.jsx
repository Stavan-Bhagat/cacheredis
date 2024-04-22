import React, { useState, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import {
  Col,
  Row,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import "../css/dashboard.css";
import axiosInstance from "../utils/axiosInstance";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { fetchBlogData } from "../Services/services";
import { REMOVE_SESSION_USER } from "../Constant/constant";
import "../css/blog.css";

const Blog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const userRole = user.role;
  const [role, setRole] = useState(userRole);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // Added state to store selected file
  });

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input is a file input, update the image state
    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0], // Store the first selected file
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
      image: null,
    });
  };

  const handleShowUpdateModal = (id) => {
    const matchedBlog = blog.find((blog) => blog._id === id);
    console.log("matchblogid", matchedBlog._id);
    setFormData({
      id: matchedBlog._id,
      title: matchedBlog.title,
      description: matchedBlog.description,
      image: null,
    });
    setShowUpdateModal(true);
  };
  // const handleShowUpdateModal = (id) => {
  //   const matchedBlog = blog.find((blogPost) => blogPost._id === id); // Change blogPost.id to blogPost._id
  //   setFormData({
  //     ...formData,
  //     id: matchedBlog._id,
  //     title: matchedBlog.title,
  //     description: matchedBlog.description,
  //     image: null,
  //   });
  //   setShowUpdateModal(true);
  // };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      await axiosInstance.post("/blog/addblogdata", formDataToSend);
      fetchBlogData()
        .then((result) => {
          setBlog(result);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      await axiosInstance.patch("/blog/updateblogdata", formDataToSend);

      fetchBlogData()
        .then((result) => {
          setBlog(result);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  // const handleSubmitUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("id", formData._id); // Add id to the form data
  //     formDataToSend.append("title", formData.title);
  //     formDataToSend.append("description", formData.description);
  //     formDataToSend.append("image", formData.image);

  //     await axiosInstance.patch(`blog/updateblogdata`, formDataToSend);
  //     fetchBlogData()
  //       .then((result) => {
  //         setBlog(result);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //     setShowUpdateModal(false);
  //   } catch (error) {
  //     console.error("Error updating blog:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`blog/deleteblogdata?id=${id}`);

        fetchBlogData()
          .then((result) => {
            setBlog(result);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
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
        setLoading(false);
        setBlog(result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-wrapper">
          <MutatingDots type="Bars" color="#00BFFF" height={80} width={80} />
          <h3 className="text-white">Loading</h3>
        </div>
      </div>
    );
  }

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
                {blog.map((blogPost, index) => (
                  <Card key={blogPost.id} className="mb-3 card">
                    <Card.Img
                      variant="top"
                      src={`data:${blogPost.contentType};base64,${blogPost.imageData}`}
                      alt={blogPost.title}
                      className="blog-image"
                      id="blog-image"
                    />
                    <Card.Body>
                      <Card.Title className="headerText">
                        {blogPost.title}
                      </Card.Title>
                      <Card.Text className="textBody">
                        {blogPost.description}
                      </Card.Text>

                      {role === "admin" && (
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="warning"
                            onClick={() => handleShowUpdateModal(blogPost._id)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(blogPost._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
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
            <Form.Group controlId="formGridImage">
              <Form.Label className="modalLabel">Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
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
            <Form.Group controlId="formGridImage">
              <Form.Label className="modalLabel">Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
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
