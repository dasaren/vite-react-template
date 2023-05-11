import React, { useEffect } from 'react'
import CheckOutStatus from '../components/CheckOutStatus'
import Layout from '../components/Layout'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from 'components/Message'
import Button from 'components/Button'
import { createOrder } from '../slice/productSlice'

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const { paymentMethod } = useSelector((store) => store.products)
  const navigate = useNavigate()
  const { cartItem } = useSelector((store) => store.products)
  const { shippingAddress } = useSelector((store) => store.products)
  const { orders, error } = useSelector((store) => store.products)

  const totalPriceInCart = cartItem
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

  const totalShippingPrice = (totalPriceInCart > 100 ? 5 : 22).toFixed(2)

  const totalTaxPrice = Number((totalPriceInCart * 0.08082).toFixed(2))

  const grandTotal = (
    Number(totalShippingPrice) +
    Number(totalTaxPrice) +
    Number(totalPriceInCart)
  ).toFixed(2)

  useEffect(() => {
    if (paymentMethod?.length < 1) {
      navigate('/products/payment')
    }
  })

  useEffect(() => {
    if (orders?.length) {
      navigate(`products/orders/${orders.id}`)
    }
  }, [dispatch])

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItem,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: totalPriceInCart,
        shippingPrice: totalShippingPrice,
        taxPrice: totalTaxPrice,
      }),
    )
  }

  return (
    <Layout>
      <div>
        <CheckOutStatus step1 step2 step3 step4 />
      </div>
      <div className="mt-8 w-[95%] meow">
        <div className="grid flex-col grid-cols-12 max-sm:flex">
          <div className="col-span-8 mr-2">
            <div className="grid gap-4">
              <div className="flex max-md:grid">
                <div>
                  <strong className="text-4xl">Shipping Method </strong>
                  <p className="mt-3">
                    {shippingAddress.address}, {shippingAddress.city},{' '}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </p>
                </div>
                <div>
                  <strong className="text-4xl">Payment Method </strong>
                  <p className="mt-3">{paymentMethod}</p>
                </div>
                {/* <div>
                  <strong className="text-4xl">Order Items </strong>
                  <p className="mt-3">{paymentMethod}</p>
                </div> */}
              </div>
              <div className="mt-6 ">
                <strong className="text-4xl">Cart Items </strong>
                <div className="mt-3 ">
                  {cartItem?.length ? (
                    <div className="">
                      {cartItem.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <div className="mb-4 ">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 "
                              />
                            </div>
                            <div className="text-3xl font-semibold text-gray-700">
                              <Link to={`/products/${item.id}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="text-3xl font-semibold text-gray-700 ">
                              {item.qty} * ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>
                      <Message>There are no items in cart</Message>{' '}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="p-4 border">
              <div>
                <p className="text-4xl">ORDER SUMMARY</p>
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p className="flex items-center mb-4 align-middle">Item</p>
                    <p className="flex items-center mb-4 align-middle">
                      Shipping
                    </p>
                    <p className="flex items-center mb-4 align-middle">Tax</p>
                    <p className="flex items-center mb-4 font-semibold align-middle">
                      Total
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="mb-4">$ {totalPriceInCart}</p>
                    <p className="mb-4">$ {totalShippingPrice}</p>
                    <p className="mb-4">$ {totalTaxPrice}</p>
                    <p className="mb-4 font-semibold">$ {grandTotal}</p>
                  </div>
                </div>
                {error?.length > 0 && <Message>{error}</Message>}
                <button
                  type="submit"
                  className="w-full p-3 font-semibold text-white bg-teal-800"
                  onClick={placeOrder}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PlaceOrder
