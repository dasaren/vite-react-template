import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCarts,
  add_to_cart,
  getProducts,
  removeFromCart,
} from '../slice/productSlice'
import Message from 'components/Message'

const CartScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { cartItem } = useSelector((store) => store.products)
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (id) {
      // dispatch(tryItem(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product))
  }

  const proceedToCheckoutHandler = () => {
    navigate('/psignin?redirect=shipping')
    navigate('/products/shipping')
  }

  return (
    <Layout>
      <div className="text-gray-700">
        <div>
          <Link to={`/products/${id}/`}>
            {' '}
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
            </span>{' '}
          </Link>
        </div>
        <div className="flex justify-around mb-2">
          <h1 className="text-left">Shopping Cart</h1>
          <h1 className="text-left text-gray-800">SUMMARY</h1>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 ">
            {cartItem.length === 0 ? (
              <div className="flex flex-col justify-center items-center w-screen h-[100vh]">
                <div className="">
                  <Message>
                    <span className="">Cart is Currently Empty</span>{' '}
                  </Message>
                </div>
                <div>
                  <Link to="/products">
                    <span className="text-center text-blue-600">
                      Click here
                    </span>{' '}
                    to add items to cart
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mx-3">
                {cartItem.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 px-2 py-3 my-2 border md:grid md:grid-cols-12 max-sm:grid"
                  >
                    <div className="md:col-span-6 max-sm:w-[100%]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[100%]"
                      />
                    </div>
                    {/* <div className="grid-cols-6 md:grid md:col-span-3 max-sm:w-3/4 ">
                    <div className="mb-3 md:col-span-6 max-sm:py-2 max-sm:pl-2 ">
                      <Link to={`/products/${product.id}`}>
                        <span className="hover:scale-125 hover:text-blue-500 ">
                          {product.name}
                        </span>{' '}
                      </Link>
                    </div>
                    <div className="md:col-span-3 max-sm:py-2 max-sm:pl-2">
                      <span>${product.price}</span>{' '}
                    </div>
                  </div> */}
                    <div className="col-span-12 md:col-span-6 card">
                      <strong className="">Product Summary</strong>
                      <div className="grid">
                        <div className="">
                          <div className="flex justify-between border">
                            <span>Price</span>
                            <strong>{product.price}</strong>
                          </div>
                          <div className="flex justify-between border">
                            <span>Status</span>
                            <strong>
                              {product.countInStock > 0
                                ? 'In Stock'
                                : 'Out Of Stock'}
                            </strong>
                          </div>
                          {/* <div className="w-[60%]"> */}
                          <div className="w-[60%]">
                            {product.countInStock > 0 && (
                              <div>
                                <div className="">
                                  <div className="grid ">
                                    <select
                                      name=""
                                      value={product.qty}
                                      onChange={(e) => {
                                        dispatch(
                                          add_to_cart({
                                            qty: Number(e.target.value),
                                            product: product,
                                          }),
                                        )
                                      }}
                                      className="w-[60%]"
                                    >
                                      {[
                                        ...Array(product.countInStock).keys(),
                                      ].map((x) => (
                                        <option value={x + 1} key={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid-rows-1 mt-2 space-x-2 ">
                        <button
                          type="button"
                          className={
                            product.countInStock > 0
                              ? 'inline-block px-6 py-2.5 btn bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out '
                              : 'disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded'
                          }
                          // onClick={addToCartHandler}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className={
                            product.countInStock > 0
                              ? 'inline-block px-6 py-2.5 btn bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-pink-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out '
                              : 'disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded'
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
              {cartItem.length > 0 && (
                <h2>
                  Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
              )}
              <div className="flex justify-between px-1 py-2 border">
                <span>Total Price:</span>{' '}
                <span className="font-extrabold ">
                  ${' '}
                  {cartItem
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  // disabled={cartItem.length > 2}
                  className={
                    cartItem.length > 0
                      ? 'cursor-progress mt-3 inline-block px-6 py-2.5 btn bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-pink-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out mb-4 '
                      : ' disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded mb-4'
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
  )
}

export default CartScreen
