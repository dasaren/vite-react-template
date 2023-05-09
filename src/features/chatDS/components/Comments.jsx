import TextField from "components/TextField";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addComments, getComments, getTopics } from "../slice/chatSlice";

const Comments = ({ topic }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const inputRef = useRef(null); // Add a ref to the input

  const addCommentHandler = (topic) => {
    // console.log("addCommentHandler", topic);
    const data = {
      comments: reply,
      topic: topic.id,
    };
    dispatch(addComments(data));

    // Clear the input field value using the ref
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setTimeout(() => {
      dispatch(getTopics());
    }, 1000);
  };
  const onChangeHandler = (e) => {
    setReply((reply) => e.target.value);
  };

  useEffect(() => {
    // dispatch(getTopics());
    dispatch(getComments());
  }, [dispatch]);

  return (
    <div className="relative mt-3">
      <input
        type="text"
        className=" w-full  rounded-3xl pl-8"
        placeholder="type comment"
        name="reply"
        // onKeyUp={addCommentHandler}
        onChange={onChangeHandler}
        ref={inputRef} // Assign the ref to the input element
      />
      <div onClick={() => addCommentHandler(topic)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-2 bottom-2 h-6 w-6 cursor-pointer text-2xl text-teal-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute left-2 bottom-2 h-6 w-6 cursor-pointer text-teal-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
      </div>
    </div>
  );
};

export default Comments;
