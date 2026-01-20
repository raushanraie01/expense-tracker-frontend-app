import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/UserContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(userContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!password) {
        setError("Please enter the password.");
        return;
      }
      // if (password.length < 5) {
      //   setError("Password must be at least 8 characters");
      //   return;
      // }

      setError("");

      //Login API call

      const response = await api.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-3/4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>{" "}
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            value={email}
            onChange={setEmail}
            placeholder="abc@gmail.com"
            label="Email address"
          />
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Min 8 char..."
            label="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3 ">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
