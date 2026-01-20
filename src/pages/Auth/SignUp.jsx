import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { isValidEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import api from "../../utils/axiosInstance.js";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import { userContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

//SignUp Components
function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(userContext);

  async function handleSignUp(e) {
    e.preventDefault();

    let profileImageUrl = "";

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    if (password.length < 5) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!fullName || fullName.split(" ").length < 2) {
      setError("Full Name must include first name and last name.");
      return;
    }

    setError("");

    //SignUp API Call
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) {
        formData.append("profileImageUrl", profilePic); // 🔑 KEY NAME MATTERS
      }

      const response = await api.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token, createdUser } = response.data;
      updateUser(createdUser);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semiboldtext-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input
              type="text"
              value={fullName}
              onChange={setFullName}
              placeholder="abc xyz"
              label="Full Name"
            />
            <Input
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="abc@xyz.com"
              label="Email"
            />

            <div className="col-span-2">
              <Input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Min 8 char..."
                label="Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          <p className="text-[13px] text-slate-800 mt-3 ">
            Already have an account ?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
