import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
// card
import userImage from "../image/u.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Col sm={2} className="sideBar">
        <Container className=" SidebarContainer">
          <div className="profile mt-5">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={userImage}
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
            </Card>
            <div className="d-flex justify-content-center align align-items-center">
              {" "}
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
    </>
  );
};

export default Sidebar;
