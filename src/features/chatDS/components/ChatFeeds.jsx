import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, deleteTopic, getTopics } from "../slice/chatSlice";
import { getUserInfo } from "features/redux-users/myUserSlice";
import moment from "moment";
import { formatDistanceToNow } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const ChatFeeds = ({ comments, topics, userProfile }) => {
  const dispatch = useDispatch();
  // const { userProfile } = useSelector((store) => store.myuser);

  const [num, setNum] = useState(Number(5));

  // useEffect(() => {
  //   dispatch(getUserInfo());
  // }, [dispatch]);

  // useState(() => {}, [topics]);

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
    }, 1000);
  };
  return (
    <div className="my-3 grid  w-full gap-2">
      {topics?.length > 0 &&
        topics.slice(0, num).map((topic) => (
          <div className="card relative  grid" key={topic.id}>
            <div className="flex h-[50px] w-full justify-between bg-pink-200 pr-4">
              <div className="flex gap-3">
                <img
                  src={topic.created_by.profile_pic}
                  alt=""
                  className="h-[30px] w-[30px] rounded-full"
                />
                <div className="">
                  <div>{topic.created_by.username}</div>
                  <div className="flex gap-5 text-[11px]">
                    {/* {moment(topic.created).fromNow()}
                    <p>
                      {formatDistanceToNow(new Date(topic.created), {
                        includeSeconds: true,
                      })}{" "}
                      ago
                    </p> */}
                    {/* <p>{dayjs(new Date().getFullYear())}</p> */}
                    {dayjs(topic.created).fromNow()}
                  </div>
                </div>
              </div>
              {userProfile[0].id === topic.created_by.id && (
                <div
                  className="text-3xl text-red-500 hover:cursor-pointer"
                  onClick={() => deleteFeedHandler(topic)}
                >
                  X
                </div>
              )}
            </div>
            <div className="bg-teal-100">
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
                      {/* {topic.comment.slice(0, num).map((comments) => ( */}
                      {topic.comment.map((comments) => (
                        <div className=" relative group-odd:text-yellow-900  group-even:text-red-800 ">
                          <div>
                            <div className="relative flex  gap-3">
                              <img
                                src={comments.host.profile_pic}
                                alt=""
                                className="h-6 w-6 rounded-full"
                              />{" "}
                              <div className="mx-auto   w-[90%] rounded-3xl bg-gray-300 py-2 px-3 ">
                                <div className="flex justify-between font-bold text-teal-800">
                                  {comments.host.username}
                                  <p className="text-[11px]">
                                    {formatDistanceToNow(
                                      new Date(comments.created),
                                      {
                                        includeSeconds: true,
                                      }
                                    )}{" "}
                                    ago
                                  </p>
                                </div>
                                <div className="pl-4  text-gray-700 ">
                                  {comments.comments}
                                </div>
                              </div>
                            </div>
                            <div className="ml-14 flex gap-5 ">
                              {/* <p>like</p>
                              <p>comment</p> */}
                            </div>
                            <div className="ml-16 mt-2 grid gap-2">
                              {/* {topic.comment.length > num && (
                                <div>more comments</div>
                              )} */}
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
                      {/* <div className="mx-auto flex w-full text-center">
                        {num <= topic.comment.length && (
                          <span
                            className="text-center text-sm text-teal-600   hover:cursor-pointer"
                            onClick={() => setNum((num) => num + 5)}
                          >
                            more comments...
                          </span>
                        )}
                      </div> */}
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
                <p className="flex text-teal-500">
                  ❤️{" "}
                  {topic?.like.length > -1 &&
                    topic.like.map((likes) => <div> {likes.likes}</div>)}
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
                  className="h-5 w-5 rounded-full"
                />
              </div>
              <div className="mr-2 mb-3 w-full ">
                <Comments topic={topic} />
              </div>
              {/* <Comments /> */}
            </div>
          </div>
        ))}
      {num <= topics.length && (
        <span
          className="text-center text-2xl text-teal-600 hover:cursor-pointer   "
          onClick={() => setNum((num) => num + 5)}
        >
          more feeds...
        </span>
      )}
    </div>
  );
};

export default ChatFeeds;
