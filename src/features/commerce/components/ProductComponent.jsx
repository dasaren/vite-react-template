import React from "react";
import { Link } from "react-router-dom";

const ProductComponent = ({ product }) => {
  console.log("here", product);
  return (
    <div className="relative">
      <div className="grid grid-cols-8 p-1">
        <div className="col-span-4 mr-1 grid gap-1">
         <Link to={product.get_image}>
          <img src={product?.get_thumbnail} alt={product.name} className="" />
          {/* {product?.get_image.length != 0 &&
            product?.get_thumbnail.length != 0 && (
              <div className="text-center text-teal-600 mt-4">
                <Link to={product.get_image}>View Product</Link>
              </div>
            )} */}
            </Link>
        </div>
        <div className="col-span-4 hover:text-teal-500">
          <div className="grid gap-3">
          <Link to={`/main/product/${product.slug}`}>
            <div className="grid  grid-cols-2">
              <p className="col-span-1 font-semibold">Name</p>
              <p className="col-span-1">{product.name}</p>
            </div>
            <hr className="w-[90%] mx-auto" />
            <div className="grid  grid-cols-2">
              <p className="col-span-1 font-semibold">Price</p>
              <p className="col-span-1">${product.price}</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <div>
        <Link to={`/main/product/${product.slug}`}>
          <span className="text-teal-600 btn success">View In Cart</span>
        </Link>
      </div> */}
    </div>
  );
};

export default ProductComponent;
