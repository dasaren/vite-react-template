import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../slice/productSlice'
import CheckOutStatus from '../components/CheckOutStatus'

const ShippingScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((store) => store.products)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const handleInputValue = (e) => {}

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/products/payment')
  }
  return (
    <Layout>
      <div>
        <CheckOutStatus step1 step2 step3 step4 />
      </div>
      <div className="mt-8">
        <form onSubmit={submitForm} className="px-5 py-6 card w-[60%] mx-auto">
          <header className="mb-4 text-4xl">SHIPPING</header>
          <fieldset className="grid gap-8">
            {/* <legend className="mb-4 text-4xl">SHIPPING</legend> */}
            {/* <header>SHIPPING</header> */}
            <TextField
              required
              type="text"
              label="city"
              name="city"
              placeholder="enter city"
              value={city || ''}
              autoComplete="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              required
              type="text"
              label="country"
              name="country"
              placeholder="enter country"
              autoComplete="country"
              value={country || ''}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              required
              type="text"
              label="address"
              name="address"
              autoComplete="address"
              placeholder="enter address"
              value={address ? address : ''}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              required
              type="text"
              label="postalCode"
              name="postalCode"
              autoComplete="postalCode"
              placeholder="enter postal code"
              value={postalCode ? postalCode : ''}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <Button type="submit">Save</Button>
          </fieldset>
        </form>
      </div>
    </Layout>
  )
}

export default ShippingScreen
