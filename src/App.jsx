import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import UserProvider from "./context/UserContext";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  return (
    <div className="">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route
              path="/dashboard"
              exact
              element={
                <Home setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
              }
            />
            <Route
              path="/income"
              exact
              element={
                <Income setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
              }
            />
            <Route
              path="/expense"
              exact
              element={
                <Expense
                  setActiveMenu={setActiveMenu}
                  activeMenu={activeMenu}
                />
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

const Root = () => {
  //check if token exists in localStorage
  const isAuthenticated = !localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
