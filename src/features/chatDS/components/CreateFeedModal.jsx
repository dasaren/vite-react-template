import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

import { redirect } from "react-router-dom";
import TextField from "components/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTopics, getTopics } from "../slice/chatSlice";

const CreateFeedModal = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const deleteItem = () => {
    navigate(location.pathway);

    toast("Feed Created Successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-message",
    });
  };
  const cancelDelete = () => {
    setShowModal(false);
  };

  const schema = yup.object().shape({
    // first_name: yup.string().required('your fullname is required'),
    // last_name: yup.string().required('your fullname is required'),
    topic: yup.string().required("enter topic to create feed"),
    description: yup.string().min(4).required("enter description.create feed"),
    // load_pic: yup.mixed(),
    load_pic: yup
      .mixed()
      .nullable()
      .notRequired()
      .test("required", "You need to provide a file", (file) => {
        // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return False;
      }),
    // .test("fileSize", "The file is too large", (file) => {
    //   //if u want to allow only certain file sizes
    //   return file && file.size <= 40000;
    // }),
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log("form", data);

    let formData = new FormData();
    formData.append("topic", data.topic);
    formData.append("description", data.description);
    formData.append("load_pic", data.load_pic[0] ? data.load_pic[0] : "");
    const see = data.load_pic;
    for (const i in data.load_pic) {
      console.log("array", i);
      //   formData.append("load_pic[]", data.load_pic[i]);
    }

    // formData.append("load_pic[]", data.load_pic[i]);
    // console.log("my formData:  ", formData.get("load_pic"));
    dispatch(addTopics(formData));
    reset();
    setShowModal(false);
    navigate(`${location.pathname}`);
    setTimeout(() => {
      dispatch(getTopics());
    }, 400);
  };

  const windowSize = window.screen.width - 20 + "px";

  const see = window.screen.width - 20;

  console.log(
    window.screen.width - 20 + "px",
    windowSize,
    window.screen.width,
    typeof windowSize,
    typeof see
  );

  return (
    // <div onClick={() => setShowModal(false)} className=" z-50">
    <div className=" z-30 ">
      <div className="modal fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-blue-300 bg-opacity-80">
        <div>
          <div
            className=" flex w-[520px] cursor-pointer  justify-end text-3xl"
            onClick={() => setShowModal(false)}
          >
            ❌
          </div>
          <div
            className={`modal-content card z-50  w-[500px] bg-white max-sm:mx-auto max-sm:w-screen`}
          >
            <div className="modal-header p-4 text-center">
              <h4>Create Feed</h4>
            </div>

            <div className="modal-body border-y-2 border-t-2 border-b-2 border-red-300 p-4">
              <form onSubmit={handleSubmit(submitForm)}>
                <fieldset>
                  {/* <TextField
                  label="enter topic"
                  className="bg-white placeholder:bg-white"
                  placeholder="enter topic"
                /> */}
                  <label
                    htmlFor="topic"
                    className="mb-2 text-base text-gray-800"
                  >
                    Enter topic
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white px-3 py-2 placeholder:bg-white "
                    placeholder="enter topic"
                    {...register("topic")}
                  />
                  <p className="text-xs italic text-red-500">
                    {errors.topic?.message}
                  </p>

                  <label
                    htmlFor="description"
                    className="my-2 text-base text-gray-800"
                  >
                    Description
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows="5"
                    className="w-full px-3 py-2    outline-none placeholder:bg-white"
                    placeholder="😄 tell us whats on your mind..."
                    {...register("description")}
                  ></textarea>
                  <p className="text-xs italic text-red-500">
                    {errors.description?.message}
                  </p>
                  <label
                    htmlFor="description"
                    className="my-2 text-base text-gray-800"
                  >
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="image"
                    multiple
                    className="w-full  bg-white px-3 py-2 "
                    placeholder="enter topic"
                    {...register("load_pic")}
                  />

                  <p className="text-xs italic text-red-500">
                    {errors.load_pic?.message}
                  </p>
                </fieldset>
                <input
                  type="submit"
                  className="btn w-full bg-teal-700 text-white"
                  value="Create Feed"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedModal;
