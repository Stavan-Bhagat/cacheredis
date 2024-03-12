import "./App.css";
import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
      <h2>hello</h2>
    </>
  );
}

export default App;
