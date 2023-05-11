import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "./Edit";
import NewModal from "components/modal/NewModal";
import { deletePost } from "../postSlice";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";


const AdminPosts = ({ posts }) => {
  const location = useLocation()

const [showModal, setShowModal] = useState(false)
const dispatch = useDispatch()
  const navigate = useNavigate();
  if (!posts || posts.length === 0)
    return (
      <div className="grid">
        <p>Cant find any Post</p>
        <div className="flex justify-end mt-3 ">
          <button className="font-extrabold text-white bg-gray-600 btn">
            ADD POST
          </button>
        </div>
      </div>
    );
  
  const editP = (post) => {
    <Edit post={post} />;
    console.log("click me", post);
    navigate(`/postpage/admin/edit/${post.id}`);
  };

  const deleteP=(post)=>{
    console.log('you deleted me')
    setShowModal(true);
    // if (showModal === true) {
    //   dispatch(deletePost(post))
    // }
  }
  return (
    
    <>
     
      <div>
        <table className="block min-w-full border-collapse md:table">
          <thead className="block md:table-header-group">
            <tr className="absolute block border border-grey-500 md:border-none md:table-row -top-full md:top-auto -left-full md:left-auto md:relative ">
              <th className="block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell">
                ID
              </th>
              <th className="block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell">
                CATEGORY
              </th>
              <th className="block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell">
                AUTHOR
              </th>
              <th className="block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell">
                TITLE
              </th>
              <th className="block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {posts?.length ? (
              posts.map((post) => (
                <tr
                  className="block bg-gray-300 border border-grey-500 md:border-none md:table-row"
                  key={post.id}>
                  <td className="block p-2 text-left md:border md:border-grey-500 md:table-cell ">
                    <span className="inline-block w-1/3 font-bold md:hidden ">
                      ID
                    </span>
                    {post.id}
                  </td>
                  <td className="block p-2 text-left md:border md:border-grey-500 md:table-cell">
                    <span className="inline-block w-1/3 font-bold md:hidden">
                      Category
                    </span>
                    {post.category}
                  </td>
                  <td className="block p-2 text-left md:border md:border-grey-500 md:table-cell">
                    <span className="inline-block w-1/3 font-bold md:hidden">
                      Author
                    </span>
                    {post.author}
                  </td>
                  <td className="block p-2 text-left md:border md:border-grey-500 md:table-cell">
                    <span className="inline-block w-1/3 font-bold md:hidden">
                      Title
                    </span>
                    {post.title}
                  </td>

                  <td className="block p-2 text-left md:border md:border-grey-500 md:table-cell">
                    <span className="inline-block w-1/3 font-bold md:hidden">
                      Actions
                    </span>
                    <button
                      className="px-2 py-1 font-bold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700 "
                      onClick={() => editP(post)}>
                      Edit
                      {/* <Link to={`/postpage/admin/edit/${post.id}`}>   Edit</Link> */}
                    </button>
                    <button className="px-2 py-1 ml-3 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-700"  onClick={() => deleteP(post)}>
                      Delete
                    </button>
                  </td>
                   {showModal && <NewModal post={post} showModal={showModal} setShowModal={setShowModal}/>}
                </tr>
                
              ))
            ) : (
              <div>No Post </div>
            )}
          </tbody>
        </table>
        <div className="flex justify-end mt-3 ">
          <Link to='/postpage/admin/create'>
          <button className="font-extrabold text-white bg-gray-600 btn">
            ADD POST
          </button>
          
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default AdminPosts;
