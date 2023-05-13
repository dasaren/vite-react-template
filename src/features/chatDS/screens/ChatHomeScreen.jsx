import Button from "components/Button";
import Layout from "components/Layout";
import Message from "components/Message";
import { getUserInfo } from "features/redux-users/myUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatFeeds from "../components/ChatFeeds";
import ChatLinks from "../components/ChatLinks";
import CreateFeedModal from "../components/CreateFeedModal";
import { getComments, getDsApps, getTopics } from "../slice/chatSlice";
import DsApps from "../components/DsApps";

const ChatHomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { topics, loading, error, comments, app_list } = useSelector(
    (store) => store.chat
  );
  const { userProfile, isAuthenticated, registered } = useSelector(
    (store) => store.myuser
  );
  // let user = userProfile

  useEffect(() => {
    // if (isAuthenticated) {
      dispatch(getUserInfo());
      dispatch(getTopics());
    // dispatch(getComments());
    dispatch(getDsApps());


    
    // dispatch(getUse)
    // }
  }, [isAuthenticated, dispatch]);

  const selectTopicHandler = () => {
    setShow((show) => !show);
  };

  const addTopicHandler = () => {
    setShowModal(true);
  };
  console.log("always", isAuthenticated, "ggggg", app_list);
  return (
    <Layout topic="dS-Social">
      {/* {error && (
        <Message>
          <span className="flex place-content-center place-items-center">
            something went wrong. Refresh your page{" "}
          </span>
        </Message>
      )} */}

      <div className="max-sm: grid min-h-screen  w-screen grid-cols-12 bg-teal-50 dark:bg-red-800 dark:text-orange-300">
        {showModal && (
          <CreateFeedModal showModal={showModal} setShowModal={setShowModal} />
        )}
        <div className="sticky  top-0 right-0 left-0 col-span-3 max-sm:hidden">
          <ChatLinks
            topics={topics}
            userProfile={userProfile}
            // user={user}
            isAuthenticated={isAuthenticated}
          />
        </div>
        {isAuthenticated ? (
          <div className="over col-span-6 max-lg:col-span-9 max-sm:col-span-12">
            <div
              className="card my-3 flex h-16 p-2  hover:cursor-pointer"
              onClick={addTopicHandler}
            >
              <button className="btn w-full  bg-teal-800 text-2xl font-extrabold text-white">
                Create Feed
              </button>
            </div>
            {/* <div
            className="card my-3 flex h-16 p-2  hover:cursor-pointer sm:hidden"
            onClick={selectTopicHandler}
          >
            <button className="btn w-full  bg-teal-800 text-2xl font-extrabold text-white">
              Navigate Topic
            </button>
          </div>
          {show && (
            <div className="sticky  top-0 right-0 left-0 col-span-3 sm:hidden">
              {<ChatLinks topics={topics} setShow={setShow} show={show} />}
            </div>
          )} */}
            <ChatFeeds
              comments={comments}
              topics={topics}
              userProfile={userProfile}
            />
          </div>
        ) : (
          <div className="over col-span-9 max-lg:col-span-9 max-sm:col-span-12">
            <DsApps app_list={app_list} />
          </div>
        )}
        <div className="col-span-3"></div>
      </div>
    </Layout>
  );
};

export default ChatHomeScreen;
