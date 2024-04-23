import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
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
        <Route
          path="/blog"
          element={isLogin ? <Blog /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
