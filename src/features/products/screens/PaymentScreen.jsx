import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import CheckOutStatus from '../components/CheckOutStatus'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { savePaymentMethod } from '../slice/productSlice'

const PaymentScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const myRef = useRef(null)
  const { shippingAddress } = useSelector((store) => store.products)
  const { paymentMethod } = useSelector((store) => store.products)
  if (shippingAddress.address.length < 1) {
    redirect('/products/shipping')
  }
  const [paymentMethods, setPaymentMethod] = useState(paymentMethod)

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethods))
    myRef.current.innerHtml = `you added me`
    myRef.current.focus()
    navigate('/products/placeorder')
  }

  const handlePaymentMethodChange = (e) => {
    // setPaymentMethod({ ...paymentMethods, [e.target.name]: e.target.value })

    setPaymentMethod(e.target.value)
  }

  return (
    <Layout>
      <div>
        {' '}
        <CheckOutStatus step1 step2 step3 step4 />
      </div>
      <div className="mt-8">
        <form onSubmit={submitForm} className="w-[60%] mx-auto card py-8 px-4">
          <legend className="text-4xl">Payment Method</legend>
          <fieldset>
            <label>Select Payment Method</label>
            {/* <div>
              <TextField
                type="checkbox"
                label="PayPal"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                onChange={handlePaymentMethodChange}
                // onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <TextField
                type="checkbox"
                label="Momo"
                id="Momo"
                name="paymentMethod"
                value="Momo"
                onChange={handlePaymentMethodChange}
                // onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div> */}
            <div className="flex gap-5 mt-5">
              <TextField
                type="radio"
                name="paymentMethod"
                id=""
                label="PayPal"
                value="PayPal"
                onChange={handlePaymentMethodChange}
              />
              <TextField
                type="radio"
                name="paymentMethod"
                label="Momo"
                id=""
                value="Momo"
                onChange={handlePaymentMethodChange}
              />
            </div>
            {/* <div>
              <label> Momo or Paypal</label>
              <div>
                <label htmlFor="paypal"></label>
                <input
                  type="checkbox"
                  name="PaymentMethod"
                  id=""
                  //   onChange={handlePaymentMethodChange}
                  className="form-input"
                />
              </div>
            </div> */}
          </fieldset>

          <Button type="submit">Save</Button>
          <p
            ref={myRef}
            className=" show dropdown-menu "
            onMouseOver={() => myRef.current.focus}
          >
            you added <span className="text-blue-600">{paymentMethods}</span> as
            your formal payment method
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default PaymentScreen
