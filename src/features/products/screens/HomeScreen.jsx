import Product from 'features/products/components/Product'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from 'components/Loader'
import Message from 'components/Message'

const HomeScreen = ({ products }) => {
  const dispatch = useDispatch()
  const { loading, errors, error } = useSelector((store) => store.products)

  return (
    <div className="mb-3 meow">
      <h1>Latest Products</h1>
      {loading && <Loader />}
      <div className="mx-auto">
        <div className="grid grid-flow-row gap-5 mx-auto lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-2 md:grid-flow-row md:justify-center">
          {products?.length &&
            products.map((product) => (
              <div
                className="sm:col-span-12 md:col-span-3 lg:col-span-4 min-w-[360px]  mx-auto sm:w-[400px]"
                // className="mx-auto sm:col-span-12 md:col-span-3 lg:col-span-4 min-[400px]:"
                key={product.id}
              >
                <Product product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
