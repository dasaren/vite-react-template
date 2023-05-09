import Layout from "components/Layout";
import React from "react";
import ecommerceImage from "assets/ecommerce.png";
import { Link } from "react-router-dom";

const DsApps = ({ app_list }) => {
  return (
    <div className=" mt-10  ">
      <div className="grid place-items-center">
        <h1>DS APPS </h1>
        <p>Browse through a catalog of apps</p>
      </div>
      <div className="md:flex">
        {app_list.length > 0 &&
          app_list.map((app) => (
            <div key={app.id} className={`card mx-2 my-2  `}>
              <div
                className={`relative ${
                  app.in_production ? "cursor-pointer " : " cursor-not-allowed"
                } `}
              >
                {!app.in_production && (
                  <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                )}
                <Link to="/psignin">
                  <img src={app.app_pic} alt="" />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DsApps;
