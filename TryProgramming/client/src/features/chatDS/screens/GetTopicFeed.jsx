import Button from "components/Button";
import Layout from "components/Layout";
import Message from "components/Message";
import { getUserInfo } from "features/redux-users/myUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChatFeeds from "../components/ChatFeeds";
import ChatLinks from "../components/ChatLinks";
import CreateFeedModal from "../components/CreateFeedModal";
import SingleTopic from "../components/SingleTopic";
import { getComments, getTopics } from "../slice/chatSlice";

const GetTopicFeed = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { topics, loading, error, comments } = useSelector(
    (store) => store.chat
  );

  const { userProfile, isAuthenticated, registered } = useSelector(
    (store) => store.myuser
  );
  useEffect(() => {
    dispatch(getTopics());
    dispatch(getUserInfo());
    dispatch(getComments());
  }, [dispatch]);

  const addTopicHandler = () => {
    setShowModal(true);
  };

  const selectTopicHandler = () => {
    setShow((show) => !show);
  };
  return (
    <Layout>
      <div className=" bg-teal-50 ">
        <div className="max-sm: grid min-h-screen  w-screen grid-cols-12 bg-teal-50">
          {showModal && (
            <CreateFeedModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          <div className="sticky  top-0 col-span-3 max-sm:hidden max-sm:min-h-screen">
            {<ChatLinks topics={topics} userProfile={userProfile} />}
          </div>
          <div className="over col-span-9 max-lg:col-span-9 max-sm:col-span-12">
            <div
              className="card my-3 flex h-16 p-2  hover:cursor-pointer"
              onClick={addTopicHandler}
            >
              <button className="btn w-full  bg-teal-800 text-2xl font-extrabold text-white">
                Create Feed
              </button>
            </div>
            <div
              className="card my-3 flex h-16 p-2  hover:cursor-pointer sm:hidden"
              onClick={selectTopicHandler}
            >
              <button className="btn w-full  bg-teal-800 text-2xl font-extrabold text-white">
                Navigate Topic
              </button>
            </div>
            {show && (
              <div className="sticky  top-0 right-0 left-0 col-span-3 sm:hidden">
                {<ChatLinks topics={topics} />}
              </div>
            )}
            {location.pathname == "/" ? (
              <ChatFeeds
                comments={comments}
                topics={topics}
                userProfile={userProfile}
              />
            ) : (
              <SingleTopic show={show} setShow={setShow} />
            )}
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </Layout>
  );
};

export default GetTopicFeed;
