import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";

const ThankYou = () => {
  const { slug } = useParams();
  return (
    <Layout>
      <div className="max-w-2xl mx-auto h-modal">
        <div className="grid justify-center content-center h-[60%]">
          <div>
            Thank you for Subscribing to{" "}
            <span className=" text-blue-600 text-base ">{slug}</span> plan
          </div>

          <div>
            Your profile has successfully been updated with your new plan
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
