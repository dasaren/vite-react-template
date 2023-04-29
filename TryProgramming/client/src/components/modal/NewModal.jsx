import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { deletePost, getPosts } from "features/posts/postSlice";
import { redirect } from "react-router-dom";

const NewModal = ({ setShowModal, showModal, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("modal post", post);

  const deleteItem = () => {
    dispatch(deletePost(post));
    // setShowModal(false)
    navigate(location.pathway);

    toast.success("Room Deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
    dispatch(getPosts());
  };
  const cancelDelete = () => {
    setShowModal(false);
  };
  return (
    <div onClick={() => setShowModal(false)}>
      <div className="modal fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-blue-300 bg-opacity-30">
        <div className="modal-content w-[500px] bg-slate-100">
          <div className="modal-header p-4">
            <h4>Delete</h4>
          </div>
          <div className="modal-body border-y-2 border-t-2 border-b-2 border-red-300 p-4">
            <h2 className="blue-400">Confirm Delete</h2>
            <div>
              <button className="btn success mr-3" onClick={() => deleteItem()}>
                Yes
              </button>
              <button className="btn danger" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewModal;
