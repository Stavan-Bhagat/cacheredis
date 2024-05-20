// import React, { useState, useEffect } from "react";
// import { MutatingDots } from "react-loader-spinner";
// import {
//   Col,
//   Row,
//   NavDropdown,
//   Container,
//   Button,
//   Modal,
//   Form,
//   Card,
// } from "react-bootstrap";
// import "../css/dashboard.css";
// import axiosInstance from "../utils/axiosInstance";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store/authSlice";
// import { REMOVE_SESSION_USER } from "../Constant/constant";
// import "../css/blog.css";
// import { AlertTitle, Alert } from "@mui/material";

// const Blog = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [blog, setBlog] = useState([]);
//   const userRole = user.role;
//   const [role, setRole] = useState(userRole);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [showUpdateAlert, SetShowUpdateAlert] = useState(false);
//   const [showDeleteAlert, SetShowDeleteAlert] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   const handleCloseAddModal = () => setShowAddModal(false);
//   const handleCloseUpdateModal = () => setShowUpdateModal(false);

//   const fetchData = async () => {
//     try {
//       const result = await axiosInstance.get("/blog/getblogdata");
//       setBlog(result.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching blog data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         image: files[0],
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout(false));
//     REMOVE_SESSION_USER();
//     navigate("/");
//   };

//   const handleShowAddModal = () => {
//     setShowAddModal(true);
//     setFormData({
//       title: "",
//       description: "",
//       image: null,
//     });
//   };

//   const handleShowUpdateModal = (id) => {
//     const matchedBlog = blog.find((blog) => blog._id === id);
//     setFormData({
//       id: matchedBlog._id,
//       title: matchedBlog.title,
//       description: matchedBlog.description,
//       image: null,
//     });
//     setShowUpdateModal(true);
//   };

//   const handleSubmitAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("image", formData.image);
//       await axiosInstance.post("/blog/addblogdata", formDataToSend);
//       fetchData();
//       setShowAddModal(false);
//       setShowSuccessAlert(true);
//     } catch (error) {
//       console.error("Error adding blog:", error);
//     }
//   };

//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("id", formData.id);
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("image", formData.image);

//       await axiosInstance.patch("/blog/updateblogdata", formDataToSend);
//       fetchData();
//       setShowUpdateModal(false);
//       SetShowUpdateAlert(true);
//     } catch (error) {
//       console.error("Error updating blog:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (confirmDelete) {
//       try {
//         await axiosInstance.delete(`blog/deleteblogdata?id=${id}`);
//         fetchData();
//         SetShowDeleteAlert(true);
//       } catch (error) {
//         console.error("Error deleting blog:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="loader-wrapper">
//           <MutatingDots type="Bars" color="#00BFFF" height={80} width={80} />
//           <h3 className="text-white">Loading</h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <header className="header">
//         <h3 className="headerText">
//           Blog app in React
//           <NavDropdown
//             className="float-end text-white fs-5"
//             title="Options"
//             id="basic-nav-dropdown"
//           >
//             <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//           </NavDropdown>
//         </h3>
//       </header>
//       <Container fluid className="dashboardContainer">
//         <Row>
//           <Sidebar />
//           <Col sm={10}>
//             <section className="mt-3">
//               <div className="addBlog text-center">
//                 <h3 className="d-inline-block text-light ">{userRole} Panel</h3>
//                 {role === "admin" && (
//                   <Button
//                     className="float-end rounded-0"
//                     variant="primary"
//                     onClick={handleShowAddModal}
//                   >
//                     Add Blog
//                   </Button>
//                 )}
//               </div>
//               <div className="container">
//                 {blog.map((blogPost) => (
//                   <Card key={blogPost._id} className="mb-3 card">
//                     <Card.Img
//                       variant="top"
//                       src={blogPost.imageUrl}
//                       alt={blogPost.title}
//                       className="blog-image"
//                       id="blog-image"
//                     />
//                     <Card.Body>
//                       <Card.Title className="headerText">
//                         {blogPost.title}
//                       </Card.Title>
//                       <Card.Text className="textBody">
//                         {blogPost.description}
//                       </Card.Text>

//                       {role === "admin" && (
//                         <div className="d-flex justify-content-end">
//                           <Button
//                             variant="warning"
//                             onClick={() => handleShowUpdateModal(blogPost._id)}
//                             className="me-2"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             onClick={() => handleDelete(blogPost._id)}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </div>
//             </section>
//           </Col>
//         </Row>
//       </Container>

//       {/* Add Blog Modal */}
//       <Modal show={showAddModal} onHide={handleCloseAddModal}>
//         <Modal.Header closeButton className="modalTitle">
//           <Modal.Title>Add Blog</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmitAdd}>
//             <Form.Group className="mb-2" controlId="formGridTitle">
//               <Form.Label className="modalLabel">Title</Form.Label>
//               <Form.Control
//                 placeholder="Enter title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formGridDescription">
//               <Form.Label className="modalLabel">Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formGridImage">
//               <Form.Label className="modalLabel">Image</Form.Label>
//               <Form.Control type="file" name="image" onChange={handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseAddModal}>
//             Close
//           </Button>
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Update Blog Modal */}
//       <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//         <Modal.Header closeButton className="modalTitle">
//           <Modal.Title>Update Blog</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmitUpdate}>
//             <Form.Group className="mb-2" controlId="formGridTitle">
//               <Form.Label className="modalLabel">Title</Form.Label>
//               <Form.Control
//                 placeholder="Enter title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formGridDescription">
//               <Form.Label className="modalLabel">Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formGridImage">
//               <Form.Label className="modalLabel">Image</Form.Label>
//               <Form.Control type="file" name="image" onChange={handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseUpdateModal}>
//             Close
//           </Button>
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Alert messages */}
//       {showSuccessAlert && (
//         <Alert
//           variant="success"
//           onClose={() => setShowSuccessAlert(false)}
//           dismissible
//         >
//           <AlertTitle>Blog added successfully</AlertTitle>
//         </Alert>
//       )}
//       {showUpdateAlert && (
//         <Alert
//           variant="success"
//           onClose={() => SetShowUpdateAlert(false)}
//           dismissible
//         >
//           <AlertTitle>Blog updated successfully</AlertTitle>
//         </Alert>
//       )}
//       {showDeleteAlert && (
//         <Alert
//           variant="success"
//           onClose={() => SetShowDeleteAlert(false)}
//           dismissible
//         >
//           <AlertTitle>Blog deleted successfully</AlertTitle>
//         </Alert>
//       )}
//     </>
//   );
// };

// export default Blog;

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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { fetchBlogData } from "../Services/services";
import { REMOVE_SESSION_USER } from "../Constant/constant";
import "../css/blog.css";
import { AlertTitle, Alert } from "@mui/material";

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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUpdateAlert, SetShowUpdateAlert] = useState(false);
  const [showDeleteAlert, SetShowDeleteAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const fetchData = () => {
    fetchBlogData()
      .then((result) => {
        setBlog(result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0],
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
    setFormData({
      id: matchedBlog._id,
      title: matchedBlog.title,
      description: matchedBlog.description,
      image: null,
    });
    setShowUpdateModal(true);
  };
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      await axiosInstance.post("/blog/addblogdata", formDataToSend);
      fetchData();
      setShowAddModal(false);
      setShowSuccessAlert(true);
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
      fetchData();
      setShowUpdateModal(false);
      SetShowUpdateAlert(true);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  // const handleSubmitAdd = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("title", formData.title);
  //     formDataToSend.append("description", formData.description);
  //     formDataToSend.append("image", formData.image);
  //     await axiosInstance.post("/blog/addblogdata", formDataToSend);
  //     fetchData();
  //     setShowAddModal(false);
  //     setShowSuccessAlert(true);
  //   } catch (error) {
  //     console.error("Error adding blog:", error);
  //   }
  // };

  // const handleSubmitUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("id", formData.id);
  //     formDataToSend.append("title", formData.title);
  //     formDataToSend.append("description", formData.description);
  //     formDataToSend.append("image", formData.image);

  //     await axiosInstance.patch("/blog/updateblogdata", formDataToSend);
  //     fetchData();
  //     setShowUpdateModal(false);
  //     SetShowUpdateAlert(true);
  //   } catch (error) {
  //     console.error("Error updating blog:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`blog/deleteblogdata?id=${id}`);
        fetchData();
        SetShowDeleteAlert(true);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
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
                      src={blogPost.imageUrl} // Update to use Cloudinary URL
                      alt={blogPost.title}
                      className="blog-image"
                      id="blog-image"
                    />
                    {/* <Card.Img
                      variant="top"
                      src={`data:${blogPost.contentType};base64,${blogPost.imageData}`}
                      alt={blogPost.title}
                      className="blog-image"
                      id="blog-image"
                    /> */}
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

      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
        >
          <AlertTitle>Success</AlertTitle>
          Blog Added Successfully
        </Alert>
      )}
      {showUpdateAlert && (
        <Alert
          severity="info"
          onClose={() => SetShowUpdateAlert(false)}
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
        >
          <AlertTitle>Updated</AlertTitle>
          Blog Updated Successfully
        </Alert>
      )}
      {showDeleteAlert && (
        <Alert
          severity="warning"
          onClose={() => SetShowDeleteAlert(false)}
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
        >
          <AlertTitle>Deleted</AlertTitle>
          Blog Deleted Successfully
        </Alert>
      )}
    </>
  );
};

export default Blog;
