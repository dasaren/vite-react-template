import Rating from 'features/products/components/Rating'
import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="">
      <div className="">
        <div className="max-w-md bg-white rounded-lg shadow-lg h-[512px]">
          <div className="w-full">
            <img
              className="rounded-t-lg h-[280px] w-full  "
              src={product.image}
              alt="img"
            />
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium text-gray-900">
              {product.name.substr(0, 20)}
            </h5>
            {/* <p className="mb-4 text-base text-gray-700">
              {post.excerpt?.length && post.excerpt.substr(0, 20)}...
            </p> */}
            <div className="mb-4 text-base text-gray-700">
              {product.review != null || product.rating != null ? (
                <div>
                  {/* {product.rating} from {product.numReviews} reviews */}
                  <Rating
                    rating={product.rating}
                    review={`${product.numReviews} reviews`}
                    color={' #f8e825'}
                  />
                </div>
              ) : (
                <span className="text-gray-500">** no reviews **</span>
              )}
            </div>
            <div className="text-4xl font-bold">{product.price}</div>

            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              //   onClick={() => postSingle(post)}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
