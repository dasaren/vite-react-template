import React, { useState, useEffect } from "react";
import axiosInstance from "app/utils/axiosInstance";
import axiosDannyInstance from "app/utils/dannysaxios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutJWT } from "features/redux-users/myUserSlice";

export default function SignOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const response = axiosDannyInstance.post("users/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("locaL_user");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("team");
    localStorage.removeItem("teams");
    // localStorage.clear()
    axiosInstance.defaults.headers["Authorization"] = null;
    axiosDannyInstance.defaults.headers["Authorization"] = null;

    navigate("/psignin");
  }, []);
  return <div>Logout</div>;
}
