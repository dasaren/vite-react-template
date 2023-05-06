import React, { useState } from "react";
import axiosInstance from "app/utils/axiosInstance";
// import axiosInstance from 'utils/axiosInstance'
// import axiosInstance from 'utils/dannysaxios'
import TextField from "./TextField";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { tokenLogin } from "features/redux-users/myUserSlice";
import { useDispatch } from "react-redux";

// MaterialUI

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(
      tokenLogin({
        email: formData.email,
        password: formData.password,
      })
    );
    navigate("/");

    // axiosInstance
    //   .post(`token/`, {
    //     email: formData.email,
    //     password: formData.password
    //   })
    //   .then(res => {
    //     localStorage.setItem('access_token', res.data.access)
    //     localStorage.setItem('refresh_token', res.data.refresh)
    //     axiosInstance.defaults.headers['Authorization'] =
    //       'JWT ' + localStorage.getItem('access_token')

    //     // console.log(res);
    //     // console.log(res.data);
    //     navigate('/')
    //   })
  };

  return (
    <Layout className="">
      <div>
        <label component="h1" variant="h5">
          Sign in
        </label>
        <form noValidate className="card mx-auto w-[70%] border p-5">
          <div className="m-8">
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              type="Checkbox"
              value="remember"
              color="primary"
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <div className="grid">
              <div className="grid">
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </div>
              <div className="grid">
                <Link to="#">
                  Don't have an account?{" "}
                  <span className="text-red-500">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
