import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckOutStatus = ({ step1, step2, step3, step4 }) => {
  function NavList() {
    // This styling will be applied to a <NavLink> when the
    // route that it links to is currently selected.
    let activeStyle = {
      textDecoration: 'underline',
    }
  }
  let activeClassName = 'underline'
  return (
    <nav className="flex content-center justify-center gap-4">
      <div className="">
        {step1 ? (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              // pointerEvents: isActive ? 'cursor' : 'none',
            })}
            to="/psignin"
            className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-gray"
          >
            login
          </NavLink>
        ) : (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              // pointerEvents: isActive ? 'cursor' : 'none',
            })}
            className="block mt-4 text-xl text-teal-200 disabled lg:inline-block lg:mt-0 hover:text-gray"
          >
            <button disabled>login</button>
          </NavLink>
        )}
      </div>
      <div>
        {step2 ? (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              // pointerEvents: isActive ? 'cursor' : 'none',
            })}
            // className={({ isActive }) =>
            //   isActive
            //     ? (activeClassName,
            //       `${activeClassName} block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-gray`)
            //     : undefined
            // }
            to="/products/shipping"
            className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-gray"
          >
            shipping
          </NavLink>
        ) : (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              pointerEvents: isActive ? 'cursor' : 'none',
            })}
            className="block mt-4 text-xl text-teal-200 disabled lg:inline-block lg:mt-0 hover:text-gray"
          >
            <button disabled>shipping</button>
          </NavLink>
        )}
      </div>
      <div>
        {step3 ? (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              // pointerEvents: isActive ? 'cursor' : 'none',
            })}
            to="/products/payment"
            className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-gray"
          >
            Make Payments
          </NavLink>
        ) : (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              pointerEvents: isActive ? 'cursor' : 'none',
            })}
            className="block mt-4 text-xl text-teal-200 disabled lg:inline-block lg:mt-0 hover:text-gray"
          >
            <button disabled>payment</button>
          </NavLink>
        )}
      </div>
      <div>
        {step4 ? (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
              // pointerEvents: isActive ? 'cursor' : 'none',
            })}
            to="/products/placeorder"
            className="block mt-4 text-xl text-teal-200 lg:inline-block lg:mt-0 hover:text-gray"
          >
            Place Order
          </NavLink>
        ) : (
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'gray',
            })}
            className="block mt-4 text-xl text-teal-200 disabled lg:inline-block lg:mt-0 hover:text-gray"
          >
            <button disabled>place Order</button>
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default CheckOutStatus
