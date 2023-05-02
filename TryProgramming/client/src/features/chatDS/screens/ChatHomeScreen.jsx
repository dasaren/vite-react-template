import Button from "components/Button";
import Layout from "components/Layout";
import Message from "components/Message";
import { getUserInfo } from "features/redux-users/myUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatFeeds from "../components/ChatFeeds";
import ChatLinks from "../components/ChatLinks";
import CreateFeedModal from "../components/CreateFeedModal";
import { getComments, getTopics } from "../slice/chatSlice";

const ChatHomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { topics, loading, error, comments } = useSelector(
    (store) => store.chat
  );
  const { userProfile, isAuthenticated, registered } = useSelector(
    (store) => store.myuser
  );
  let user = userProfile[0];
  useEffect(() => {
    // if (isAuthenticated) {
    dispatch(getTopics());
    dispatch(getUserInfo());
    dispatch(getComments());
    // dispatch(getUse)
    // }
  }, [isAuthenticated, dispatch]);

  const selectTopicHandler = () => {
    setShow((show) => !show);
  };

  const addTopicHandler = () => {
    setShowModal(true);
  };
  //
  //

  console.log("status:  ", window.navigator.onLine);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOffline, setIsOffline] = useState(!navigator.online);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
    
    const handleOffline = () =>  {
      setIsOnline(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }


    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const see = (
    <div className=" bg-red-500 px-2 py-2  ">
      <h2>User Status: {isOnline ? "Online" : "Offline"}</h2>
    </div>
  );

  return (
    <Layout>
      {/* {see} */}
      {showMessage && 
        <p>{see}</p>
        // <div>
        //   {isOnline ? (
        //     <p>User is online</p>
        //   ) : (
        //     <p>User is offline</p>
        //   )}
        // </div>
      }
     
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
        <div className="sticky  left-0 right-0 top-0 col-span-3 max-sm:hidden">
          <ChatLinks topics={topics} userProfile={userProfile} user={user} />
        </div>
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
        <div className="col-span-3"></div>
      </div>
    </Layout>
  );
};

export default ChatHomeScreen;
