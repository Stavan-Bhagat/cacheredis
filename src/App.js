// import "./App.css";
// import SignIn from "./Component/SignIn";
// import SignUp from "./Component/SignUp";
// import { BrowserRouter as Router, Route, Routes ,useNavigate} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Blog from "./Component/Blog";
// import Dashboard from "./Component/Dashboard";
// import { Provider, useSelector } from "react-redux";
// import store from "./store/store";
// import { useEffect } from "react";

import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
// import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import Dashboard from "./Component/Dashboard";
import Blog from "./Component/Blog";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={isLogin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
