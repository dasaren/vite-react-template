import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
// import 'index.css'

import { useDispatch, useSelector } from 'react-redux'

import { useCookies } from 'react-cookie'
import AuthContext from 'app/context/AuthContext'
import { logoutJWT } from 'features/redux-users/myUserSlice'
import SearchBar from 'features/posts/SearchBar'
import SearchB from 'features/posts/SearchB'

// import {login,logout} from '../store'
// import {useSelector} from 'react-redux'

const ProductsNavbar = () => {
  // let { user, logoutUser } = useContext(AuthContext);
  const dispatch = useDispatch()
  // const my = useSelector((state) => state.user)
  const [cookies, setCookie, removeCookie] = useCookies()
  const [show, setShow] = useState(null)
  const { registered, tryUser } = useSelector((state) => state.myuser)

  const wrapMe = () => {
    setShow(!show)
  }

  const logout = () => {
    logoutUser()
  }

  const localUser = JSON.parse(localStorage.getItem('locaL_user'))
  const authLinks = (
    <>
      <div
        // style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        // to="/dashboard"
        className="block mt-4 text-2xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white hover:cursor-pointer "
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
      <Link to="/signout">
        <div
          className="drop   block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
          onClick={() => dispatch(logoutJWT())}
        >
          SignOut
        </div>
      </Link>
    </>
  )

  const guestLinks = (
    <>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        to="/register"
        className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
      >
        Register
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        to="/registerme"
        className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
      >
        Rregister
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        to="/login"
        className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
      >
        Login
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        to="/signin"
        className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
      >
        Sign In
      </NavLink>
      <NavLink
        style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}
        to="/psignin"
        className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
      >
        <i className="fas fa-user"></i> Personal_Login
      </NavLink>
    </>
  )

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between p-6 bg-[#09222d]">
        <Link
          to="/"
          className="flex items-center flex-shrink-0 mr-6 text-white"
        >
          <svg
            className="w-8 h-8 mr-2 fill-current"
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
            className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white "
            onClick={wrapMe}
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {!show && (
          <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow lg:flex lg:gap-3">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'white',
                })}
                to="/"
                className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                Home
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'white',
                })}
                to="/products"
                className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                Product-Page
              </NavLink>
            </div>
            <div className="text-sm lg:flex-grow lg:flex lg:gap-3">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'white',
                })}
                to="/shop"
                className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                shop
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'white',
                })}
                to="/products/cart"
                className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
              >
                <i className="fas fa-shopping-cart"></i> <span>cart</span>
              </NavLink>
            </div>
            <div className="lg:flex lg:gap-3 ">
              {localUser != null ? authLinks : guestLinks}
              {/* {isAuthenticated ? authLinks : guestLinks} */}
              {/* {user ? authLinks : guestLinks} */}
            </div>
            <div className="lg:flex lg:gap-3">
              {/* {authLinks} */}
              {/* {guestLinks} */}

              <Link to="/signout">
                <div
                  className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-white"
                  onClick={() => dispatch(logoutJWT)}
                >
                  SignOut
                </div>
              </Link>
            </div>

            <div>
              <span className="text-white">
                {localUser != null && localUser.email}
              </span>
              {/* <div>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/dennis">Login</Link>
              )}
            </div> */}
              {/* <div> {user && <span>@ {user.email}</span>}</div> */}
              <div>
                <div className="flex justify-center">
                  <div>
                    <div className="relative dropdown">
                      <button
                        className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
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
                          className="w-2 ml-2"
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
                        className="absolute z-50 hidden float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg  dropdown-menu min-w-max bg-clip-padding"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent  dropdown-item whitespace-nowrap hover:bg-gray-100"
                            to={`/products/user/profile/${localUser?.username}`}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent  dropdown-item whitespace-nowrap hover:bg-gray-100"
                            href="#"
                          >
                            Another action
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent  dropdown-item whitespace-nowrap hover:bg-gray-100"
                            href="#"
                          >
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <SearchBar />
          <SearchB />
        </div>
      </nav>
    </header>
  )
}

export default ProductsNavbar

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
