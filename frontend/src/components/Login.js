import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  //handle login with google 
  const onSuccess = async (res) => {
    try {
      const response = await axios.post(
        `http://localhost/allevent/backend/googleLogin.php`,
        {
          email: res.email,
          name: res.name,
          password: res.aud,
        }
      );

      console.log(response);
      //handle cookie in localstorage
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successfully")
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in Login");
      console.error("Error in Login:", error);
    }
  };


  //simple login code

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(
        "http://localhost/allevent/backend/login.php",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success('Login Successfully')
        navigate("/");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in Login");
      console.error("Error in Login :", error);
    }
  };


//check login every time when user click or redirect
  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg shadow-gray-700  w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Your Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="pt-2 text-center">
            Does not have any Account?{" "}
            <Link to="/Signup" className="text-blue">
              Signup
            </Link>
          </p>
          <div className="flex items-center justify-center">
            <div className="w-[40%] bg-black  border h-[3px]"></div>
            <p className="m-auto">OR</p>
            <div className="w-[40%] bg-black  border h-[3px]"></div>
          </div>
          <div className="w-full flex items-center justify-center pt-3">
            <GoogleOAuthProvider clientId="641120120235-n2ho20hf47toan61ql24ml07jokhi6ln.apps.googleusercontent.com">
              <GoogleLogin 
                onSuccess={async (credentialResponse) =>{
                  let data = jwtDecode(credentialResponse.credential)
                  await onSuccess(data);
                }
                }
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
