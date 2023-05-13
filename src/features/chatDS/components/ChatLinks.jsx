import { getUserInfo, logoutJWT } from "features/redux-users/myUserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Topics from "./Topics";
import { redirect } from "react-router-dom";

const ChatLinks = ({ topics, user, userProfile, isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getUserInfo());
  // }, [dispatch]);

  // const { userProfile } = useSelector((store) => store.myuser);

  return (
    <div className="mt-3 grid gap-10">
      <div className="px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <img src={userProfile[0]?.profile_pic} alt="" className="rounded-full " />
          </div>

          <div className="text-bold col-span-9 text-xl text-teal-800">
            {userProfile[0]?.username}
            {/* {user.username} */}
          </div>
        </div>
      </div>
      <div className="grid gap-2 px-3 text-pink-500">
        <div className="grid cursor-pointer grid-cols-12  text-pink-500 hover:rounded hover:bg-gray-100 ">
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>

          <div className="text-bold col-span-10 text-xl ">
            <Link to="/"> Home</Link>
          </div>
        </div>
        {/* <Link to="/psignin"> */}

        {!userProfile[0]?.profile_pic ? (
          <Link to="/psignin">
            <div className="grid cursor-pointer grid-cols-12 hover:rounded hover:bg-gray-100">
              <div className="col-span-2 text-3xl">&#9784;</div>

              <div className="text-bold col-span-10 text-xl ">Login</div>
            </div>
          </Link>
        ) : (
          <div
            className="grid cursor-pointer grid-cols-12 hover:rounded hover:bg-gray-100"
            onClick={() => {
              dispatch(logoutJWT());

              setTimeout(() => {
                window.location.reload();
                navigate("/");
               
              }, 600);
            }}
          >
            <div className="col-span-2 text-3xl">&#9784;</div>

            <div className="text-bold col-span-10 text-xl ">Logout</div>
          </div>
        )}

        {/* </Link> */}
      </div>

      <hr className="mx-3 border-solid border-teal-900" />

      {isAuthenticated && (
        <div>
          <Topics topics={topics} userProfile={userProfile} />
        </div>
      )}

      {isAuthenticated && <hr className="mx-3 border-solid border-teal-900" />}
    </div>
  );
};

export default ChatLinks;
