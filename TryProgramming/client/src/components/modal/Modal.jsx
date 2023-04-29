import { deleteRoom, getRooms } from "features/study/roomSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Modal = ({ id, setShow, setMe, setDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("id", id);
  const deleteItem = (id) => {
    dispatch(deleteRoom(id));
    // navigate('/baseapp/home')
    setMe(null);
    setDelete(true);
    // dispatch(getRooms())
    setShow(false);
    toast.success("Room Deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const cancelDelete = () => {
    setShow(false);
  };
  return (
    <div onClick={() => setShow(false)}>
      <div className="modal fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-blue-300 bg-opacity-30">
        <div className="modal-content w-[500px] bg-slate-100">
          <div className="modal-header p-4">
            <h4>Delete</h4>
          </div>
          <div className="modal-body border-y-2 border-t-2 border-b-2 border-red-300 p-4">
            <h2 className="blue-400">Confirm Delete</h2>
            <div>
              <button
                className="btn success mr-3"
                onClick={() => deleteItem(id)}
              >
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

export default Modal;
