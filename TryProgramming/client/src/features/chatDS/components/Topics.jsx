import LoadingComponent from "components/loadingComponent";
import Message from "components/Message";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getTopics } from "../slice/chatSlice";

const Topics = ({ topics, show, setShow }) => {
  const dispatch = useDispatch();
  // const { topics, loading, error } = useSelector((store) => store.chat);
  // console.log("", loading);

  // useEffect(() => {
  //   dispatch(getTopics());
  // }, [dispatch]);
  // console.log("ssss", topics);
  return (
    <div>
      <h4 className="mx-3 mb-2 text-left">
        <Link to="/">TOPICS ({topics.length})</Link>
      </h4>
      <div className="grid">
        {topics?.length > 0 &&
          topics.map((topic) => (
            <div className="px-3" key={topic.id}>
              <div className="grid grid-cols-12 hover:rounded hover:bg-gray-100">
                <div className="col-span-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                </div>
                <div className="text-bold max-sm: col-span-10 text-xl text-teal-800 max-sm:overflow-scroll">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive && "red",
                    })}
                    to={`/${topic.slug}`}
                    className={`mt-4 block text-xl text-teal-800 hover:text-teal-500 lg:mt-0 lg:inline-block 
                    `}
                    onClick={() => setShow((show) => !show)}
                  >
                    {topic.topic}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Topics;
