import React from "react";
import Layout from "../components/Layout";

const Success = () => {
  return (
    <Layout>
      <div className="lg:grid max-lg:grid gap-10 flex place-content-center h-[800px] text-teal-700 text-center">
        <span className="text-5xl">
          Thank You For Shopping with DS ENTERPRISE
        </span>
        <span className="text-3xl">
          Your Order Will be processed in the next 7 hours
        </span>
      </div>
    </Layout>
  );
};

export default Success;
