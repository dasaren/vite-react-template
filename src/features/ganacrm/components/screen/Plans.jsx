import Button from "components/Button";
import { getPlans, upgradePlan } from "features/ganacrm/slice/crmSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans } = useSelector((store) => store.crm);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

  const Subscribe = (plan) => {
    console.log(`you have successfully subscribed to ${plan.name} plan`);
    dispatch(upgradePlan({ plan: plan.name }));
    navigate(`/crm/thank-you/${plan.name}`);
  };

  return (
    <Layout>
      <div className="text-gray-600 max-w-4xl mx-auto px-2">
        <div>
          <h1 className=" font-medium">Plans</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {plans?.length != 0 &&
            plans.map((plan) => (
              <div className="card md:col-span-1 gap-2 grid">
                <h3 className=" uppercase ">{plan.name}</h3>
                <div className="grid gap-4 mb-0">
                  <div className="grid grid-cols-5 ">
                    <div className=" col-span-2 ">Price</div>
                    <div className=" col-span-3  font-medium">
                      $ {plan.price}
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <span className=" col-span-2">Max Leads</span>
                    <span className=" col-span-3 font-medium">
                      {plan.max_leads} leads
                    </span>
                  </div>
                  <div className="grid grid-cols-5 ">
                    <span className=" col-span-2">Max Clients</span>
                    <span className=" col-span-3 font-medium">
                      {plan.max_clients} clients
                    </span>
                  </div>
                </div>
                <div className="">
                  <Button onClick={() => Subscribe(plan)}>Subscribe</Button>
                </div>
              </div>
            ))}

          {/* <div className="card md:col-span-1 gap-2 ">
            <h1></h1>
            <div></div>
          </div>
          <div className="card md:col-span-1 gap-2 ">
            <h1></h1>
            <div></div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
