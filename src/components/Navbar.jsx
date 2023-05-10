import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import 'index.css'

import { useDispatch, useSelector } from "react-redux";

import { useCookies } from "react-cookie";
import AuthContext from "app/context/AuthContext";
import { logoutJWT } from "features/redux-users/myUserSlice";
import SearchB from "./SearchB";
import { getTopics } from "features/chatDS/slice/chatSlice";

// import {login,logout} from '../store'
// import {useSelector} from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const [cookies, setCookie, removeCookie] = useCookies();
  const [show, setShow] = useState(null);

  const { registered, tryUser, isAuthenticated } = useSelector(
    (state) => state.myuser
  );
  const inputRef = useRef();
  const wrapMe = () => {
    // setShow(!show);
    // inputRef.current.textContent = "Updated Text";
    inputRef.current.classList.add(
      "text-blue-600",
      "font-6xl",
      // "bg-teal-900",
      "p-3"
    );
    inputRef.current.classList.toggle(
      "block"
      // "bg-red-600",
      // "delay-150",
      // "delay-2s",
      // "duration-1000",
      // "ease-in-out"
      // "text-red-600"
    );
    inputRef.current.classList.toggle(
      // "text-blue-600"
      // "delay-250",
      "max-lg:hidden"

      // "ease-in-out"
    );
    // inputRef.current.classList.remove("max-lg:hidden");
  };

  // useEffect(() => {
  //   // dispatch(getTopics());
  // }, [dispatch]);

  const logout = () => {
    logoutUser();
  };
  let [page, setPage] = useState(1);

  const getValue = async (e) => {
    console.log("sssss", e.target.value);
    dispatch(getTopics(e.target.value));
    // dispatch(getTopics({ page: page, query: e.target.value }));
  };

  const localUser = JSON.parse(localStorage.getItem("locaL_user"));
  const authLinks = (
    <>
      <Link to="/signout">
        <div
          className="drop mt-4 mr-2 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          onClick={() => dispatch(logoutJWT())}
        >
          SignOut
        </div>
      </Link>

      {/* <Link to="/signout">
        <div
          className=" mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          onClick={() => dispatch(logoutJWT)}
        >
          p SignOut
        </div>
      </Link> */}
    </>
  );

  const guestLinks = (
    <div className="flex justify-between w-full">
      <NavLink
        style={({ isActive }) => ({ color: isActive ? "red" : "white" })}
        to="/register"
        className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block mr-2"
      >
        Register
      </NavLink>
      {/* <NavLink
        style={({ isActive }) => ({ color: isActive ? "red" : "white" })}
        to="/registerme"
        className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      >
        Rregister
      </NavLink> */}

      <NavLink
        style={({ isActive }) => ({ color: isActive ? "red" : "white" })}
        to="/psignin"
        className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
      >
        <i className="fas fa-user"></i> Login
      </NavLink>
    </div>
  );

  return (
    <header className="bg-teal-700 ">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between p-2 transition  delay-150 duration-1000 ease-in-out">
        <div className="flex">
          <Link
            to="/"
            className="mr-6 flex flex-shrink-0 items-center text-white"
          >
            <svg
              className="fill-current mr-2 h-8 w-8"
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

          {isAuthenticated && (
            <div className=" ">
              <SearchB getValue={getValue} />
            </div>
          )}
        </div>

        <div className="block md:hidden">
          <button
            className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white max-md:flex "
            onClick={wrapMe}
          >
            <svg
              className="fill-current h-3 w-3 bg-white text-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {!show && (
          <div
            ref={inputRef}
            className={`  w-full flex-grow  max-lg:hidden lg:flex lg:w-auto lg:items-center`}
          >
            <div className="text-sm hover:text-red-50 hover:opacity-80 lg:flex lg:flex-grow lg:gap-3"></div>

            <div className="text-sm lg:flex lg:flex-grow lg:gap-3">
              {/* <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
                to="/main/account"
                className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
              >
                <span>MY ACCOUNT</span>
              </NavLink> */}
            </div>
            <div className="text-sm lg:flex lg:flex-grow lg:gap-3">
              {/* <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
                to="/main/cart"
                className="mt-4 block text-xl text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
              >
                <span class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
              </NavLink> */}
            </div>
            <div className="text-sm lg:flex lg:flex-grow lg:gap-3"></div>
            <div className="text-sm lg:flex lg:flex-grow lg:gap-3"></div>
            <div className="flex place-content-end lg:hidden  lg:gap-3">
              {/* {localUser != null ? authLinks : guestLinks} */}
              {isAuthenticated ? authLinks : guestLinks}
              {/* {!isAuthenticated && guestLinks} */}
              {/* {user ? authLinks : guestLinks} */}
            </div>
            <div className="lg:flex lg:gap-3"></div>

            <div>
              <span className="text-white">
                {/* {isAuthenticated && localUser.email} */}
              </span>
              {/* <div>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/dennis">Login</Link>
              )}
            </div> */}
              {/* <div> {user && <span>@ {user.email}</span>}</div> */}
              {/* <div>
                <div className="flex justify-center">
                  <div>
                    <div className="dropdown relative">
                      <button
                        className="
          dropdown-toggle
          flex
          items-center
          whitespace-nowrap
          rounded
          bg-blue-600
          px-6
          py-2.5
          text-xs
          font-medium
          uppercase
          leading-tight text-white
          shadow-md transition duration-150 ease-in-out
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg
          focus:outline-none
          focus:ring-0
          active:bg-blue-800
          active:text-white
          active:shadow-lg
        "
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {localUser != null && localUser.email}
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="caret-down"
                          className="ml-2 w-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill="currentColor"
                            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                          ></path>
                        </svg>
                      </button>
                      <ul
                        className="dropdown-menu absolute z-50 float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left text-base shadow-lg"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            className="dropdown-item block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100"
                            to={`/profile`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a
                            className="dropdown-item block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100"
                            href="#"
                          >
                            Another action
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100"
                            href="#"
                          >
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}
        {/* <div>
          <SearchBar />
          <SearchB />
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;

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
