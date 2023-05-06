import React from "react";
// import { AppContext } from "../App";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout";

// import Counter from "../components/Counter";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = () => {
  // const { username } = useContext(AppContext);
  const {
    data: mydata,
    isLoading,
    error,
    refetch,
  } = useQuery(["cat"], () => {
    return axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isLoading) {
    return (
      <Layout>
        {/* <Layout /> */}
        <h1 className="text-blue-500">Loading....</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-red-500">data does not exist....</h1>
      </Layout>
    );
  }
  return (
    <Layout title="ds-home" content="home">
      <div>Home PAGE</div>
      {/* <h1>Current USER: {username}</h1> */}
      <br />
      <hr />
      <br />
      <hr />
      <div className="bg-orange-500">
        <p className="p-5">{mydata?.fact}</p>
        <button
          className="m-4 rounded bg-green-600 px-2 py-1"
          onClick={refetch}
        >
          Fetch Cat Data
        </button>
      </div>
      <div>
        <br />
        <br />
        <hr />
        <hr />
      </div>
      <div>
        <br />
        <br />
        <hr />
        <hr />
      </div>
    </Layout>
  );
};

export default Home;
