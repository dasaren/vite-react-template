import Message from "components/Message";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import ProductComponent from "../components/ProductComponent";
import { getProducts } from "../Slice/commerceSlice";

const Main = () => {
  const dispatch = useDispatch();
  const { products, previousPage, nextPage, pageCount } = useSelector(
    (store) => store.commerce
  );

  useEffect(() => {
    // document.title = "ds | pproduct";
    dispatch(getProducts({ page: page, query: "" }));
  }, [dispatch]);

  let [page, setPage] = useState(1);
  console.log("page count", pageCount);
  const goToPreviosPage = () => {
    if (page > 0) {
      setPage((page -= 1));
      // dispatch(getLeads(page))
    }
  };
  const goToNextPage = () => {
    setPage(page + 1);
    // dispatch(getLeads(page))
  };

  const getPages = Math.round(pageCount / 20);

  return (
    <Layout title="ds online-shop">
      <div className="max-w-5xl mx-auto px-3 text-gray-500 mb-2">
        <div className="grid place-content-center mt-5 text-teal-600 text-center gap-4">
          <p className="text-4xl max-sm:text-[30px]">DS COMMERCE</p>
          <div>
            <p className="text-2xl max-sm:text-[20px]">BEST QUALITY E-COMMERCE ONLINE SHOP</p>
          </div>
        </div>
        <hr className="max-w-4xl mx-auto font-extrabold px-8 my-5 border border-teal-900 border-solid" />
        <div className="">
          <div className="grid lg:grid-cols-12 sm:grid-cols-8">
            {products?.length &&
              products.map((product) => (
                <div className="col-span-4 bg-teal-50 my-1 mx-1 gap-y-4 card ">
                  <ProductComponent product={product} key={product.id} />
                </div>
              ))}

            <div></div>
          </div>
        </div>
        <div className="grid">
          <div className="grid  grid-flow-col gap-2   place-content-center">
            {previousPage != null && (
              <btn
                className="btn go my-3 w-[150px] py-5 text-center cursor-pointer text-white font-bold"
                onClick={goToPreviosPage}
              >
                <span className=" ">Previous</span>{" "}
              </btn>
            )}
            {nextPage != null && (
              <btn
                className="btn go my-3 w-[150px] py-5 text-center     cursor-pointer  text-white font-bold"
                onClick={goToNextPage}
              >
                <span className=" "> Next</span>
              </btn>
            )}
          </div>
         {page > 1&& <span>Navigate through the pages</span>}
         {page > 1&& <div className="another flex gap-2 py-7 justify-end  mx-auto ">
            {[...Array(getPages).keys()].map((x) => (
              <button
                value={x + 1}
                key={x + 1}
                className="flex space-x-4 btn yellow mr-4 active:text-red-600 active:bg-yellow-400 focus-within:bg-red-600"
                onClick={() => setPage(x + 1)}
              >
                {x + 1}
              </button>
            ))}
          </div>
          }
          {page > 1&& 
          <span className="btn go flex gap-x-4">
            {[...Array(getPages).keys()]}
          </span>
          }

        </div>
      </div>
    </Layout>
  );
};

export default Main;
