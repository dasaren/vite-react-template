import React from "react";

import { Helmet } from "react-helmet-async";

import MyFooter from "components/MyFooter";

import Navbar from "./Navbar";
import DsNavbar from "./DsNavbar";

// const Layout = (props) => (

const Layout = ({ children, title, content, type, name, description }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      {/* own */}
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>

    <div className="sticky top-0 z-50 overflow-hidden ">
      <Navbar />
    </div>
    <div className=" min-h-screen">{children}</div>
    <div className=" ">
      <MyFooter />
    </div>
  </>
);

export default Layout;
