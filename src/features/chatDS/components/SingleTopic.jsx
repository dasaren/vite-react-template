import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";
import { getUserInfo } from "features/redux-users/myUserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, getTopic } from "../slice/chatSlice";
import Comments from "./Comments";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const SingleTopic = ({ show, setShow }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { topic } = useSelector((store) => store.chat);
  const { userProfile } = useSelector((store) => store.myuser);
  const [num, setNum] = useState(Number(5));

  const likeCommentHandler = (topic) => {
    dispatch(addLikes(topic));
    setTimeout(() => {
      dispatch(getTopics());
    }, 500);
  };

  const deleteFeedHandler = (topic) => {
    dispatch(deleteTopic(topic));
    setTimeout(() => {
      dispatch(getTopics());
    }, 500);
  };

  useEffect(() => {
    dispatch(getUserInfo());
    if (slug) {
      dispatch(getTopic(slug));
      dispatch(getUserInfo());
    }
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(getComments());
    // dispatch(getTopics());
  }, [topic]);

  return (
    <div>
      {!show && (
        <div className="my-3 grid  w-full gap-2">
          {/* {topics?.length > 0 && */}
          {/* topics.slice(0, num).map((topic) => ( */}
          <div className="card relative  grid" key={topic.id}>
            <div className="flex h-[50px] w-full justify-between bg-pink-50 pr-4">
              <div className="flex gap-3">
                <img
                  src={topic.created_by?.profile_pic}
                  alt=""
                  className="h-[30px] w-[30px] rounded-full"
                />
                <div className=" grid">
                  <p>{topic.created_by?.username}</p>

                  <p className="flex gap-5 text-[11px]">
                    {/* {moment(topic.created).fromNow()}
                    <p>
                      {formatDistanceToNow(new Date(topic.created), {
                        includeSeconds: true,
                      })}{" "}
                      ago
                    </p> */}
                    {/* <p>{dayjs(new Date().getFullYear())}</p> */}
                    {dayjs(topic.created).fromNow()}
                  </p>
                </div>
              </div>
              {/* {userProfile[0].id === topic.created_by.id && (
              <div
                className="text-3xl text-red-500 hover:cursor-pointer"
                onClick={() => deleteFeedHandler(topic)}
              >
                X
              </div>
            )} */}
            </div>
            <div className="bg-blue-100">
              <div>
                <div>
                  <p className=" px-1   text-3xl capitalize">{topic.topic}</p>
                  <div className=" py-3 px-1">
                    <div>{topic.description}</div>
                    <div>
                      <img
                        src={topic?.load_pic}
                        alt=""
                        className="min-w-full"
                      />
                    </div>

                    <div className="m-4 max-h-[500px] overflow-scroll   rounded bg-gray-100">
                      {/* {topic?.comment?.slice(0, num).map((comments) => ( */}
                      {topic?.comment?.map((comments) => (
                        <div className=" relative group-odd:text-yellow-900  group-even:text-red-800 ">
                          <div>
                            <div className="relative flex  gap-3">
                              <img
                                src={comments.host.profile_pic}
                                alt=""
                                className="h-6 w-6"
                              />{" "}
                              <div className="mx-auto   w-[90%] rounded-3xl bg-gray-300 py-2 px-3 ">
                                <div className="flex justify-between font-bold text-teal-800">
                                  {comments.host.username}
                                  <p className="text-[11px] ">
                                    {formatDistanceToNow(
                                      new Date(comments.created),
                                      {
                                        includeSeconds: true,
                                      }
                                    )}{" "}
                                    ago
                                  </p>
                                </div>
                                <div className="flex  justify-between pl-4 text-gray-700">
                                  {comments.comments}
                                </div>
                              </div>
                            </div>
                            <div className="ml-14 flex gap-5 ">
                              {/* <p>like</p>
                            <p>comment</p> */}
                            </div>
                            <div className="ml-16 mt-2 grid gap-2">
                              {" "}
                              {/* {topic?.response.slice(0, num).map((reply) => (
                                <div className="flex gap-3 ">
                                  <img
                                    src={reply.host?.profile_pic}
                                    alt=""
                                    className="h-5 w-5"
                                  />{" "}
                                  <div className="bg-gray-200 rounded-2xl py-2 px-1 grid w-[80%] mx-auto">
                                    <div className="font-bold text-teal-800">
                                      {reply.host?.username}
                                    </div>
                                    <div className="pl-4  text-gray-500">
                                      <p> {reply?.response} </p>
                                    </div>
                                  </div>
                                </div>
                              ))} */}
                            </div>
                          </div>
                          {/* <div className="pl-4">{comments.comments}</div> */}

                          {/* <div className="w-full">
                            <Comments comments={comments} topic={topic} />
                          </div> */}
                          {/* <div className="pl-4">{comments.comments}</div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-8 flex justify-between gap-8 py-1">
              <div className="cursor-pointer hover:scale-150">
                <p
                  className="text-teal-500"
                  onClick={() => {
                    setNum((num) => (num += 5));
                  }}
                >
                  💬
                  <span className="rounded-full bg-teal-500 p-1 text-xs text-white">
                    {topic?.comment?.length}
                  </span>
                </p>
              </div>
              <div
                className="flex cursor-pointer hover:scale-150"
                onClick={() => likeCommentHandler(topic)}
              >
                <p className="text-teal-500">
                  {/* ❤️{" "} */}
                  {topic?.like?.length > -1 &&
                    topic.like.map((likes) => <div> ❤️ {likes.likes}</div>)}
                  {/* <span className=" text-teal-500 rounded-full p-1">
                   
                    {topic?.like.length > 0 &&
                      topic.like.map((likes) => <div> ❤️ {likes.likes}</div>)}
                  </span> */}
                </p>
              </div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className=" flex ">
              <div className=" mr-3 flex place-items-center">
                <img
                  src={userProfile[0]?.profile_pic}
                  alt=""
                  className="h-5 w-5  rounded-full"
                />
              </div>
              <div className="mr-2 mb-3 w-full ">
                <Comments topic={topic} />
              </div>
              {/* <Comments /> */}
            </div>
          </div>
          {/* ))} */}

          {/* <span
          className="text-center hover:cursor-pointer text-teal-600 text-2xl"
          onClick={() => setNum((num) => num + 5)}
        >
          more feeds...
        </span> */}
        </div>
      )}
    </div>
  );
};

export default SingleTopic;
