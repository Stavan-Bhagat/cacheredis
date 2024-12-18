// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Modal,
//   Form,
//   Col,
//   Row,
//   Container,
//   Image,
//   NavDropdown,
// } from "react-bootstrap";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store/authSlice";
// import { fetchUserData } from "../Services/services";
// import {
//   GET_SESSION_USER,
//   REMOVE_SESSION_USER,
//   REMOVE_IS_LOGIN,
// } from "../Constant/constant";
// import axiosInstance from "../utils/axiosInstance";
// import welcomeImage from "../image/welcome.jpg";
// import { AlertTitle, Alert } from "@mui/material";
// import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/core/dist/styles/ag-grid.css";
// import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
// import UpdateUserModal from "./UpdateUserModal";
// import UpdateAlert from "./UpdateAlert";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const userObject = GET_SESSION_USER();
//   const userRole = userObject ? userObject.role : null;
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const [users, setUsers] = useState([]);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUpdateAlert, setShowUpdateAlert] = useState(false);

//   const handleClose = () => setShowUpdateModal(false);

//   const fetchData = () => {
//     fetchUserData()
//       .then((result) => {
//         setUsers(result);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     REMOVE_SESSION_USER();
//     REMOVE_IS_LOGIN();
//     navigate("/");
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleShow = (user) => {
//     setSelectedUser(user);
//     setShowUpdateModal(true);
//   };

//   const handleUpdateUser = (updatedUser) => {
//     // Update the user data in the state or make an API call
//     setShowUpdateAlert(true);
//     handleClose();
//   };

//   const deleted = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (confirmDelete) {
//       try {
//         await axiosInstance.delete(`submit/deleteuserdata?id=${userId}`);
//         console.log(`User deleted with ID ${userId}`);
//         fetchData();
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <header className="header">
//         <h3 className="headerText ">
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
//               <div className="container">
//                 <h1 className="text-white text-center">Hello, {user.name}</h1>
//                 {userRole === "admin" ? (
//                   <div className="ag-theme-alpine" style={{ height: 400 }}>
//                     <AgGridReact
//                       rowData={users}
//                       defaultColDef={{
//                         sortable: true,
//                         filter: true,
//                         resizable: true,
//                       }}
//                     >
//                       <AgGridReact.Column
//                         field="imageUrl"
//                         headerName="Profile"
//                         cellRenderer={(params) => (
//                           <Image
//                             src={params.value}
//                             alt="User Image"
//                             className="user-image"
//                           />
//                         )}
//                       />
//                       <AgGridReact.Column field="name" headerName="Name" />
//                       <AgGridReact.Column field="email" headerName="Email" />
//                       <AgGridReact.Column field="role" headerName="Role" />
//                       <AgGridReact.Column
//                         headerName="Actions"
//                         cellRendererFramework={(params) => (
//                           <div>
//                             <Button
//                               variant="warning"
//                               onClick={() => handleShow(params.data)}
//                               disabled={
//                                 params.data.role === "admin" &&
//                                 params.data._id === userObject?._id
//                               }
//                               style={{ marginRight: "8px" }}
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               variant="danger"
//                               onClick={() => deleted(params.data._id)}
//                               disabled={
//                                 params.data.role === "admin" &&
//                                 params.data._id === userObject?._id
//                               }
//                             >
//                               Delete
//                             </Button>
//                           </div>
//                         )}
//                       />
//                     </AgGridReact>
//                   </div>
//                 ) : (
//                   <Container className="text-white">
//                     <Image
//                       src={welcomeImage}
//                       alt="welcome"
//                       style={{ width: "100%", height: "75vh" }}
//                     />
//                   </Container>
//                 )}
//               </div>
//             </section>
//           </Col>
//         </Row>
//       </Container>
//       <UpdateUserModal
//         show={showUpdateModal}
//         user={selectedUser}
//         onClose={handleClose}
//         onUpdate={handleUpdateUser}
//       />
//       <UpdateAlert
//         show={showUpdateAlert}
//         onClose={() => setShowUpdateAlert(false)}
//       />
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Col,
  Row,
  Container,
  Image,
  NavDropdown,
} from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { fetchUserData } from "../Services/services";
import {
  GET_SESSION_USER,
  REMOVE_SESSION_USER,
  REMOVE_IS_LOGIN,
} from "../Constant/constant";
import axiosInstance from "../utils/axiosInstance";
import welcomeImage from "../image/welcome.jpg";
import { AlertTitle, Alert } from "@mui/material";
// import { AgGridColumn, AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/core/dist/styles/ag-grid.css";
// import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const userObject = GET_SESSION_USER();
  const userRole = userObject ? userObject.role : null;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [showUpdateAlert, SetShowUpdateAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [role, setRole] = useState(userRole);
  const handleClose = () => setShow(false);

  const fetchData = () => {
    fetchUserData()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const handleLogout = () => {
    dispatch(logout());
    REMOVE_SESSION_USER();
    REMOVE_IS_LOGIN();
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = (id) => {
    const user = users.find((user) => user._id === id);
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
      const responsePost = await axiosInstance.patch(
        `submit/updateuserdata?id=${id}`,
        formData
      );
      console.log("Data successfully updated:", responsePost.data);
      fetchData();
      setShow(false);
      SetShowUpdateAlert(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleted = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`submit/deleteuserdata?id=${userId}`);
        console.log(`User deleted with ID ${userId}`);
        fetchData();
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
                        <th>profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            <div className="user-image-wrapper">
                              <Image
                                src={user.imageUrl}
                                alt="User Image"
                                className="user-image"
                              />
                            </div>
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleShow(user._id)}
                              disabled={
                                user.role === "admin" &&
                                user._id === userObject?._id
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => deleted(user._id)}
                              disabled={
                                user.role === "admin" &&
                                user._id === userObject?._id
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
                    <Image
                      src={welcomeImage}
                      alt="welcome"
                      style={{ width: "100%", height: "75vh" }}
                    />
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
      {/* update alert */}
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
    </>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   NavDropdown,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AgGridColumn, AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/core/dist/styles/ag-grid.css";
// import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
// import Sidebar from "./Sidebar";
// import { logout } from "../store/authSlice";
// import { fetchUserData } from "../Services/services";
// import {
//   GET_SESSION_USER,
//   REMOVE_SESSION_USER,
//   REMOVE_IS_LOGIN,
// } from "../Constant/constant";
// import axiosInstance from "../utils/axiosInstance";
// import welcomeImage from "../image/welcome.jpg";
// import { Alert, AlertTitle, Image } from "@mui/material";
//-------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Modal,
//   Form,
//   Col,
//   Row,
//   Container,
//   Image,
//   NavDropdown,
// } from "react-bootstrap";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store/authSlice";
// import { fetchUserData } from "../Services/services";
// import {
//   GET_SESSION_USER,
//   REMOVE_SESSION_USER,
//   REMOVE_IS_LOGIN,
// } from "../Constant/constant";
// import axiosInstance from "../utils/axiosInstance";
// import welcomeImage from "../image/welcome.jpg";
// import { AlertTitle, Alert } from "@mui/material";
// import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
// import "@ag-grid-community/core/dist/styles/ag-grid.css";
// import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const userObject = GET_SESSION_USER();
//   const userRole = userObject ? userObject.role : null;
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const [users, setUsers] = useState([]);
//   const [show, setShow] = useState(false);
//   const [id, setId] = useState("");
//   const [showUpdateAlert, setShowUpdateAlert] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", role: "" });
//   const [role, setRole] = useState(userRole);

//   const handleClose = () => setShow(false);

//   const fetchData = () => {
//     fetchUserData()
//       .then((result) => {
//         setUsers(result);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     REMOVE_SESSION_USER();
//     REMOVE_IS_LOGIN();
//     navigate("/");
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleShow = (id) => {
//     const user = users.find((user) => user._id === id);
//     setFormData(user);
//     setId(id);
//     setShow(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const responsePost = await axiosInstance.patch(
//         `submit/updateuserdata?id=${id}`,
//         formData
//       );
//       console.log("Data successfully updated:", responsePost.data);
//       fetchData();
//       setShow(false);
//       setShowUpdateAlert(true);
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const deleted = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (confirmDelete) {
//       try {
//         await axiosInstance.delete(`submit/deleteuserdata?id=${userId}`);
//         console.log(`User deleted with ID ${userId}`);
//         fetchData();
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     } else {
//       return;
//     }
//   };

//   const renderProfileImage = (params) => {
//     return <Image src={params.value} alt="User Image" className="user-image" />;
//   };

//   const renderEditButton = (params) => {
//     return (
//       <Button
//         variant="warning"
//         onClick={() => handleShow(params.data._id)}
//         disabled={
//           params.data.role === "admin" && params.data._id === userObject?._id
//         }
//       >
//         Edit
//       </Button>
//     );
//   };

//   const renderDeleteButton = (params) => {
//     return (
//       <Button
//         variant="danger"
//         onClick={() => deleted(params.data._id)}
//         disabled={
//           params.data.role === "admin" && params.data._id === userObject?._id
//         }
//       >
//         Delete
//       </Button>
//     );
//   };

//   return (
//     <>
//       <header className="header">
//         <h3 className="headerText ">
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
//               <div className="container">
//                 <h1 className="text-white text-center">Hello, {user.name}</h1>
//                 {role === "admin" ? (
//                   <div className="ag-theme-alpine" style={{ height: 400 }}>
//                     <AgGridReact rowData={users}>
//                       <AgGridColumn field="name" headerName="Name" />
//                       <AgGridColumn field="email" headerName="Email" />
//                       <AgGridColumn field="role" headerName="Role" />
//                       <AgGridColumn
//                         headerName="Actions"
//                         cellRendererFramework={(params) => (
//                           <div>
//                             <Button
//                               variant="warning"
//                               onClick={() => handleShow(params.data._id)}
//                               disabled={
//                                 params.data.role === "admin" &&
//                                 params.data._id === userObject?._id
//                               }
//                               style={{ marginRight: "8px" }}
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               variant="danger"
//                               onClick={() => deleted(params.data._id)}
//                               disabled={
//                                 params.data.role === "admin" &&
//                                 params.data._id === userObject?._id
//                               }
//                             >
//                               Delete
//                             </Button>
//                           </div>
//                         )}
//                       />
//                     </AgGridReact>
//                   </div>
//                 ) : (
//                   <Container className="text-white">
//                     <Image
//                       src={welcomeImage}
//                       alt="welcome"
//                       style={{ width: "100%", height: "75vh" }}
//                     />
//                   </Container>
//                 )}
//               </div>
//             </section>
//           </Col>
//         </Row>
//       </Container>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton className="modalTitle">
//           <Modal.Title>Update Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-2" controlId="formGridAddress1">
//               <Form.Label className="modalLabel">Name</Form.Label>
//               <Form.Control
//                 placeholder="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formGridEmail">
//               <Form.Label className="modalLabel">Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group as={Col} className="mb-2" controlId="formGridState">
//               <Form.Label className="modalLabel">Role</Form.Label>
//               <Form.Select
//                 aria-label="Default select example"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option disabled selected value={""}>
//                   Select Role
//                 </option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {showUpdateAlert && (
//         <Alert
//           severity="info"
//           onClose={() => setShowUpdateAlert(false)}
//           sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
//         >
//           <AlertTitle>Updated</AlertTitle>
//           Blog Updated Successfully
//         </Alert>
//       )}
//     </>
//   );
// };

// export default Dashboard;
