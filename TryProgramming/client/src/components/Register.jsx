import React, { useState } from "react";
import axiosInstance from "app/utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import TextField from "./TextField";
import Button from "./Button";
import Layout from "./Layout";
// MaterialUI
// import Avatar from 'material-ui/core/Avatar'
// import Button from '@material-ui/core/Button'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'

// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }))

export default function SignUp() {
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`users/register/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        navigate("/login");
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <Layout title="register user">
      <button className="btn success" onClick={() => navigate("/")}>
        HOME
      </button>

      <div className="">
        <div>Sign up</div>

        <form className="" noValidate>
          <div spacing={2}>
            <div xs={12} className="grid">
              <TextField
                // variant='outlined'
                // required
                // fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="grid" xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="grid" xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                // value={formData.password}
              />
            </div>
            <div className="grid" xs={12}>
              <input
                value="allowExtraEmails"
                color="primary"
                type="checkbox"
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <div justify="flex-end grid">
            <div>
              <Link to="/login">
                Already have an account?{" "}
                <span className="text-red-500">Login</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
