import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { getOrderProducts } from "../Slice/cartSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orderLists } = useSelector((store) => store.cart);
  useEffect(() => {
    dispatch(getOrderProducts());
  }, [dispatch]);
  return (
    <Layout>
      <div className="grid grid-cols-12">
        {orderLists.length > 0 &&
          orderLists.map((list) => (
            <div className="col-span-3 card m-2">
              <div>
                <h2 className="text-center">ORDERS</h2>
                <h4>{list.user}</h4>
                <div>
                  {JSON.stringify(list.product)}
                  {/* {list.products.map((item) => (
                    <div className="">
                      <div>
                        <div>name</div>
                        <div>{item.name}</div>
                      </div>
                      <div></div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default OrderList;
