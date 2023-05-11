import React, { useEffect } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../slice/productSlice'
import HomeScreen from '../screens/HomeScreen'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { loading, products } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  const loadMe = (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="inline-block w-8 h-8 text-blue-600 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-purple-500 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-green-500 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-red-500 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-yellow-500 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-blue-300 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="inline-block w-8 h-8 text-gray-300 bg-current rounded-full opacity-0 spinner-grow"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  // const meow = 'margin-inline: auto'

  return (
    <Layout title="products-page ">
      <div className="meow">
        {loading && loadMe}
        {!loading ? (
          <HomeScreen products={products} />
        ) : (
          <div className="mx-auto text-4xl text-blue-500">
            There are no products to display
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ProductsPage
