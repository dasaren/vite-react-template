import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "components/Message";
import Layout from "../components/Layout";
import { addToCart, getCartItems, removeFromCart } from "../Slice/cartSlice";
import { redirect } from "react-router-dom";

const Cart = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cartItem, loading } = useSelector((store) => store.cart);
  console.log("start", cartItem);
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const [qty, setQty] = useState(Number());
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const reload = () => {
    setTimeout(() => {
      dispatch(getCartItems());
    }, 900);
  };

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product.id));
    reload();
    setTimeout(()=>{}, 1000)
  };

  console.log("myloatuion", location);
  const proceedToCheckoutHandler = () => {
    // navigate("/psignin?redirect=/main/cart/checkout");
    navigate("/main/cart/checkout");
  };

  const OnChangeHandler = (e) => {
    setQty((e.target.name = e.target.value));
  };
  const loader = <div class="ds-ring"></div>;
  return (
    <Layout>
      {loading && loader}
      <div className="text-gray-700">
        <div>
          <Link to={`/main`}>
            {" "}
            <span className="pl-4 ml-3 text-blue-600 hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </span>{" "}
          </Link>
        </div>

        <div className="flex justify-around mb-2">
          <h1 className="text-left">Shopping Cart</h1>
          <h1 className="text-left text-gray-800 max-sm:hidden">SUMMARY</h1>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 ">
            {cartItem.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-screen h-[100vh]">
                <div className="">
                  <Message>
                    <span className="">Cart is Currently Empty</span>{" "}
                  </Message>
                </div>
                <div>
                  <Link to="/main">
                    <span className="text-center text-blue-600">
                      Click here
                    </span>{" "}
                    to add items to cart
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mx-3 py-2">
                {cartItem.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 px-2 py-3 my-2 border md:grid md:grid-cols-12 max-sm:grid p-2"
                  >
                    {/* {JSON.stringify(product)} */}
                    <div className="md:col-span-6 max-sm:w-[100%] col-span-12">
                      <img
                        src={product?.product?.get_thumbnail}
                        alt={product.name}
                        className="w-[100%] h-[290px] object-fill"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6 card p-1">
                      <strong className="">Product Summary</strong>
                      <div className="grid">
                        <div className="">
                          <div className="flex justify-between border">
                            <span>Price</span>
                            <strong>{product.price.toFixed(2)}</strong>
                          </div>
                          <div className="flex justify-between border">
                            <span>Status</span>
                            <strong>
                              {product.product.countInStock > 0
                                ? `In Stock (${product.product.countInStock})`
                                : "Out Of Stock"}
                            </strong>
                          </div>
                          <div className="flex justify-between border">
                            <span>Quantity in Cart</span>
                            <strong>{product.quantity}</strong>
                          </div>
                          <div className="flex justify-between border">
                            <span>Total Cost</span>
                            <strong>
                              $ {(product.quantity * product.price).toFixed(2)}
                            </strong>
                          </div>

                          <div className="w-[60%]">
                            {product.product.countInStock > 0 && (
                              <div>
                                <div className="">
                                  <div className="grid ">
                                    <select
                                      name=""
                                      value={product.quantity}
                                      onChange={(e) => {
                                        dispatch(
                                          addToCart({
                                            quantity: Number(e.target.value),
                                            product: product.product.id,
                                            price: product.price,
                                          })
                                        );
                                      }}
                                      className="w-[60%]"
                                    >
                                      {[
                                        ...Array(
                                          product.product.countInStock
                                        ).keys(),
                                      ].map((x) => (
                                        <option value={x + 1} key={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                    {/* <div className="grid grid-flow-col gap-1 mt-3">
                                      <button className="w-[30px] h-[30px] text-center border border-gray-500 hover:text-blue-500 hover:text-2xl">
                                        +
                                      </button>
                                      <input
                                        type="number"
                                        name={product.name}
                                        id=""
                                        min="1"
                                        defaultValue={product.quantity}
                                        max={product.product.countInStock}
                                        // value={product.quantity}
                                        onChange={OnChangeHandler}
                                        className="w-[80px] h-[30px] text-center border border-gray-500 "
                                      />
                                      <button className="w-[30px] h-[30px] text-center border border-gray-500 hover:text-red-500 hover:text-2xl">
                                        -
                                      </button>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid-rows-1 mt-2 space-x-2 ">
                        {/* <button
                          type="button"
                          className={
                            product.product.countInStock > 0
                              ? "inline-block px-6 py-2.5 btn bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                              : "disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded"
                          }
                        >
                          Confirm
                        </button> */}
                        <button
                          type="button"
                          className={
                            product.product.countInStock > 0
                            ? "inline-block px-6 py-2.5 btn bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-pink-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out "
                            : "disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded"
                          }
                          onClick={() => removeFromCartHandler(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-12 mx-2 md:col-span-4">
            <div className="font-bold">
              <h3 className="sm:hidden">Summary</h3>
              {cartItem.length > 0 && (
                <h4>
                  Subtotal (
                  {cartItem.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h4>
              )}
              <div className="flex justify-between px-1 py-2 border">
                <span>Total Price:</span>{" "}
                <span className="font-extrabold ">
                  ${" "}
                  {cartItem
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  // disabled={cartItem.length > 2}
                  className={
                    cartItem.length > 0
                      ? "max-sm:mb-2 cursor-progress mt-3 inline-block px-6 py-2.5 btn bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-pink-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out mb-4 "
                      : "max-sm:mb-2 disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded mb-4"
                  }
                  onClick={() => proceedToCheckoutHandler()}
                >
                  Proceed To CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
