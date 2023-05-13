import Rating from "features/products/components/Rating";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { addToCart } from "../Slice/cartSlice";
import { getProduct } from "../Slice/commerceSlice";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { product, loading } = useSelector((store) => store.commerce);
  // console.log("product", product);
  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch]);

  // const loader = () => {
  //   if (loading) return <div class="ds-ring"></div>;
  // };
  const addToCartHandler = (product) => {
    const data = {
      quantity: Number(qty),
      price: Number(product.price),
      product: product.id,
    };
    dispatch(addToCart(data));
    navigate("/main/cart");
    // console.log("check prd", data);
  };

  const loader = <div class="ds-ring"></div>;
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-2">
        <div>
          <Link to="/main ">
            {" "}
            <span className="text-blue-600 hover:text-red-500">
              Go Back
            </span>{" "}
          </Link>
          {loading && loader}
        </div>
        <div className="grid w-[100%]  sm:grid-cols-12 md:grid-rows-1 m-auto mx-2  mt-3 max-md:my-1">
          <div className="md:col-span-4 sm:col-span-12 ">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg shadow-lg md:max-w-xs">
                <div className="w-full">
                  <img
                    className="rounded-t-lg h-[290px] w-full  "
                    src={product?.get_thumbnail}
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
                          // rating={product.rating}

                          color={" #f8e825"}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500">** no reviews **</span>
                    )}
                  </div>
                  <div className="text-4xl font-bold">
                    Price: $ {product.price}
                  </div>

                  {/* <button
                    type="button"
                    className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                    color={" #f8e825"}
                    //   onClick={() => postSingle(post)}
                  >
                    Button
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="px-5  card py-8 md:py-0 max-sm:my-3 md:col-span-8 bg-slate-100 sm:col-span-12  max-sm:h-[300px]">
            <h1 className="text-center max-sm:text-2xl max-sm:font-bold">
              {product.name}
            </h1>
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
        </div>
        <div className="md:col-span-3 sm:col-span-12 card  max-sm:mb-4 py-4">
          <strong className="">Product Summary</strong>
          <div className="grid">
            <div className="">
              <div className="flex justify-between border">
                <span>Price</span>
                <strong>$ {product.price}</strong>
              </div>
              <div className="flex justify-between border">
                <span>Status</span>
                <strong>
                  {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </strong>
              </div>
              <div className="flex justify-between border">
                <span>Quantity in stock</span>
                <strong>{product.countInStock}</strong>
              </div>
              <div className="flex justify-between border font-bold text-teal-900">
                <span>Quantity you are ordering</span>
                <strong>
                  {product.countInStock > 0 ? (
                    qty
                  ) : (
                    <span className="text-teal-900"> cant order now</span>
                  )}
                </strong>
              </div>
              <div className="w-[60%] mt-2">
                {product?.countInStock > 0 && (
                  <div>
                    <div className="">
                    <label htmlFor="qty" className="mr-2  max-sm:hidden">
                          Enter Quantity to Order
                        </label>
                      <div className="grid  max-sm:hidden">
                        <select
                          name=""
                          id=""
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="w-[60%]"
                        >
                          {[...Array(product?.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div class="control mt-4 border-b md:hidden">
                        <label htmlFor="qty" className="mr-2 ">
                          Enter Quantity to Order
                        </label>
                        <input
                          type="number"
                          class="input"
                          min="1"
                          max={product?.countInStock}
                          name="qty"
                          v-model="qty"
                          value={qty}
                          // onChange={(e) => setQty(e.target.value)}
                          onChange={(e) => {
                            if (e.target.value > product?.countInStock) {
                              e.target.value = product?.countInStock;
                            }
                            setQty(e.target.value);
                          }}
                        />
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
              product?.countInStock > 0
                ? "mt-3 inline-block px-6 py-2.5 btn bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                : "mt-3 disabled:btn bg-gray-400  cursor-not-allowed py-2 px-3 rounded d"
            }
            onClick={() =>
              product.countInStock > 0 ? addToCartHandler(product) : ""
            }
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
