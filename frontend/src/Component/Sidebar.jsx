import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import userImage from "../image/u.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {loginSuccess} from "../store/authSlice"

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axiosInstance.patch(
        `submit/updateuserdata?id=${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Check if the update was successful, then update the profile image
      if (response.status === 200) {
        // Assuming the backend returns the updated user object with imageUrl
        const user = response.data;
        dispatch(loginSuccess(user));
        

      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  return (
    <Col sm={2} className="sideBar">
      <Container className="SidebarContainer">
        <div className="profile mt-5">
          <Card sx={{ position: "relative", maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={user.imageUrl}
                alt="User"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-center"
                >
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h6 className="text-center">{user.email}</h6>
                  <h6 className="text-center">{user.role}</h6>
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* Button positioned absolutely */}
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
              }}
              component="label"
              htmlFor="profile-image-input"
            >
              <EditIcon />
            </IconButton>
          </Card>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="profile-image-input"
          />
          <div className="d-flex justify-content-center align align-items-center">
            <div className="mt-3">
              <Link to="/blog">
                <Button variant="outline-info">Blog</Button>
              </Link>
            </div>
            <div className="mt-3">
              <Link to="/dashboard ">
                <Button variant="outline-light">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default Sidebar;
