import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCarts, add_to_cart, getProduct } from "../slice/productSlice";
import Rating from "../components/Rating";
import Button from "components/Button";
import Loader from "components/Loader";
import Message from "components/Message";

const ProductScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  const { product, error, loading } = useSelector((state) => state.products);

  const addToCartHandler = () => {
    // dispatch(addToCarts({ product, qty }))
    dispatch(add_to_cart({ product, qty }));
    navigate(`/products/cart/${id}?qty=${qty}`);
  };
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen card">
          <div>
            <Link to="/products ">
              {" "}
              <span className="text-blue-600 hover:text-red-500">
                Go Back
              </span>{" "}
            </Link>
          </div>

          <div className="grid w-[100%]  sm:grid-cols-12 md:grid-rows-1 m-auto mx-2  mt-3">
            <div className="md:col-span-4 sm:col-span-12 ">
              <div className="w-full">
                <div className="w-full bg-white rounded-lg shadow-lg md:max-w-xs">
                  <div className="w-full">
                    <img
                      className="rounded-t-lg h-[280px] w-full  "
                      src={product.image}
                      alt="img"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium text-gray-900">
                      {product.name}
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
                            color={" #f8e825"}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">** no reviews **</span>
                      )}
                    </div>
                    <div className="text-4xl font-bold">
                      Price: {product.price}
                    </div>

                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                      color={" #f8e825"}
                      //   onClick={() => postSingle(post)}
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-8 md:py-0 sm:my-3 md:col-span-5 bg-slate-100 sm:col-span-12 sm:mb-4">
              <h1 className="text-center">{product.name}</h1>
              <div className="">
                {/* <Rating
              rating={product.rating}
              review={`${product.numReviews} reviews`}
              color={' #f8e825'}
            /> */}
                <div>
                  <strong>Description:</strong>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 sm:col-span-12 card ">
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
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </div>
                  <div className="w-[60%]">
                    {product.countInStock > 0 && (
                      <div>
                        <div className="">
                          <div className="grid ">
                            <select
                              name=""
                              id=""
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              className="w-[60%]"
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>
              <button
                type="button"
                className={
                  product.countInStock > 0
                    ? "inline-block px-6 py-2.5 btn bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                    : "disabled:btn bg-gray-400 mt-3 cursor-not-allowed py-2 px-3 rounded"
                }
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductScreen;
