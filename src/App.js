import "./App.css";
import SignIn from "./component/signIn";
import SignUp from "./component/signUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./component/Blog";
import Dashboard from "./component/dashboard";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
