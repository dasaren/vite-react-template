import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
const PageNotFound = () => {
  return (
    <Layout title="page 404" content="page 404">
      <h1 className="align-center flex justify-center text-5xl text-red-700">
        Page you are looking for does not exist
      </h1>
      {/* <div className="notfound grid h-screen place-items-center"> */}
      <div className="grid h-screen place-items-center ">
        <h1 className="notfound__heading">404 Not Found</h1>
        <Link to="/" className="text-blue-500">
          Click to redirect you to home page
        </Link>
        <p className="notfound__paragraph">
          The link you requested does not exist on our website.
        </p>
      </div>
    </Layout>
  );
};

export default PageNotFound;
