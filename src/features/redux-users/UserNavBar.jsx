import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../index.css";

import { useDispatch, useSelector } from "react-redux";
import AuthContext from "features/dennis/context/AuthContext";
import { useCookies } from "react-cookie";
import Search from "features/study/Search";

// import {login,logout} from '../store'
// import {useSelector} from 'react-redux'

const UserNavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state).cart;
  const { isAuthenticated } = useSelector((state) => state.user);
  // const my = useSelector((state) => state.user)
  const [cookies, setCookie, removeCookie] = useCookies();
  const [show, setShow] = useState(null);

  const wrapMe = () => {
    setShow(!show);
  };

  const logout = () => {
    logoutUser();
    removeCookie("myuser");
  };

  const authLinks = (
    <>
      <div
        // style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        // to="/dashboard"
        className="mt-4 block text-2xl text-teal-200 hover:cursor-pointer hover:text-white lg:mt-0 lg:inline-block "
      >
        <span className="nav-item">
          <div
            className="nav-link pointer hover:text-red-600 "
            // href="#!"
            // onClick={() => dispatch(logout())}
            onClick={logout}
          >
            Logout
          </div>
        </span>
      </div>
      <div></div>
    </>
  );

  const guestLinks = (
    <>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "red" : "white" })}
        to="/register"
        className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      >
        Register
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "red" : "white" })}
        to="/login"
        className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      >
        Login
      </NavLink>
    </>
  );

  return (
    <nav className="flex flex-wrap items-center justify-between bg-[#646cff] p-6">
      <Link to="/" className="mr-6 flex flex-shrink-0 items-center text-white">
        <svg
          className="mr-2 h-8 w-8 fill-current"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="text-5xl font-semibold tracking-tight text-orange-500">
          DS
          {/* {cookies.user && <p>{cookies.user}</p>} */}
        </span>
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white "
          onClick={wrapMe}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {!show && (
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="text-sm lg:flex lg:flex-grow lg:gap-3">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              to="/reduxtodo"
              className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              ReduxTodo
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              to="/reduxuser"
              className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              ReduxUser
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              to="/reduxuser/users"
              className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              R-User-List
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              to="/reduxuser/users/add-user"
              className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              R-Add-User
            </NavLink>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              to="/reduxuser/users/edit-user/:id"
              className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              R-Edit-user
            </NavLink>
          </div>
          <div className="lg:flex lg:gap-3 ">
            {/* {isAuthenticated ? authLinks : guestLinks} */}
            {user ? authLinks : guestLinks}
          </div>
          <div className="lg:flex lg:gap-3">
            {/* {authLinks} */}
            {/* {guestLinks} */}
            <Link
              to="#"
              className="mt-4 ml-2 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
            >
              Download
            </Link>
          </div>

          <div>
            {/* <div>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/dennis">Login</Link>
              )}
            </div> */}
            <div> {user && <span>@ {user.email}</span>}</div>
            <div>
              <Search />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavBar;

//  <nav className="flex flex-wrap items-center justify-between p-6 bg-teal-500">
//         <Link
//           to="/"
//           className="flex items-center flex-shrink-0 mr-6 text-white"
//         >
//           <svg
//             className="w-8 h-8 mr-2 fill-current"
//             width="54"
//             height="54"
//             viewBox="0 0 54 54"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
//           </svg>
//           <span className="text-xl font-semibold tracking-tight">DS</span>
//         </Link>
//         <div className="block lg:hidden">
//           <button className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white">
//             <svg
//               className="w-3 h-3 fill-current"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <title>Menu</title>
//               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//             </svg>
//           </button>
//         </div>
//         <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
//           <div className="text-sm lg:flex-grow">
//             <NavLink
//               style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//               to="/homepage"
//               className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
//             >
//               Homepage
//             </NavLink>
//             <NavLink
//               style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//               to="/home"
//               className="block mt-4 mr-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
//             >
//               Home2
//             </NavLink>
//             <NavLink
//               style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//               to="/tut"
//               className="block mt-4 text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
//             >
//               Tut
//             </NavLink>
//           </div>
//           <div>
//             <NavLink
//               style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//               to="#"
//               className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
//             >
//               Download
//             </NavLink>
//           </div>
//         </div>
//       </nav>

// <div className="flex justify-between w-screen text-white bg-orange-500">
//   <div className="p-4 font-extrabold text-white">
//     <Link to="/" className="text-4xl text-white">
//       DS
//     </Link>
//     <div>

//     </div>
//   </div>
//   <div className="relative flex gap-3 p-4 font-bold text-white">
//     <button>
//       <NavLink
//         style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//         to="/"
//       >
//         HOMEPAGE
//       </NavLink>
//     </button>
//     <button>
//       <NavLink
//         style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//         to="/home"
//       >
//         HOME2
//       </NavLink>
//     </button>
//     <button>
//       <NavLink
//         style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//         to="/tut"
//       >
//         TUT
//       </NavLink>
//     </button>
//     <button>
//       <NavLink
//         style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
//         to="/article-page"
//       >
//         Articles
//       </NavLink>
//     </button>
//   </div>

// </div>
