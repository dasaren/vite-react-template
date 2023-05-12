import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getCartItems, getShippingAddress } from "../Slice/cartSlice";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import getStripe from "../Slice/stripes";
import Button from "components/Button";
import Stripe from "../components/stripe/Stripe";

const Checkout = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { cartItem } = useSelector((store) => store.cart);
  const { myAddress } = useSelector((store) => store.cart);
  const stripe = loadStripe(
    "pk_test_51LQs56J4Ld6rviALPnQLvUPnnaUHi6QZEhZlnlgd05vMnnV8heo68vCyyykfPe8IBt3YY68aiQD76zteuufBhO9w00sP1Jvl6C"
  );
  const me = {};

  // function Stripe() {
  //   return (
  //     <Elements stripe={stripe}>
  //       <PaymentForm />
  //     </Elements>
  //   );
  // }
  console.log("stripe", stripe);
  var style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  };
  const elements = stripe.Elements;
  // const elements = stripe.elements;
  // const card = elements.create(
  //   "card",
  //   { hidePostalCode: true },
  //   { style: style }
  // );
  // console.log("card", card);
  // card.mount("#card-element");
  // card.addEventListener("change", function (event) {
  //   var displayError = document.getElementById("card-errors");
  //   if (event.error) {
  //     displayError.textContent = event.error.message;
  //   } else {
  //     displayError.textContent = "";
  //   }
  // });

  // const stripe = getStripe();
  // const elements = stripePromise.elements();
  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getShippingAddress());
  }, [dispatch]);

  useEffect(() => {
    if (cartItem?.length > 0) {
      // const stripe = stripePromise;
      // const card = elements.create(
      //   "card",
      //   { hidePostalCode: true },
      //   { style: style }
      // );
      // console.log("card", card);
      // card.mount("#card-element");
    }
  }, [cartItem, stripe]);

  const submitForm = (e) => {
    // e.prevent.Default();
    console.log("shege");
    stripe.createToken(card).then((result) => {
      if (result.error) {
        console.log("1st roubd");
        console.log("werror", result.error.message);
        var errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        console.log("2nd round");
        stripeTokenHandler(result.token);
      }
    });
    // console.log("me-token", me);
  };

  const stripeTokenHandler = (token) => {
    // Insert the token ID into the form so it gets submitted to the server
    // var form = document.getElementById('payment-form');
    // var hiddenInput = document.createElement('input');
    // hiddenInput.setAttribute('type', 'text');
    // hiddenInput.setAttribute('name', 'stripeToken');
    // hiddenInput.setAttribute('value', token.id);
    // form.appendChild(hiddenInput);
    alert("Success! Got token: " + token.id);
    alert("shege");

    // Submit the form
    // form.submit();
  };

  return (
    <Layout title="cart || checkout">
      <div className="max-w-5xl mx-auto my-3 text-gray-600 max-sm:mx-1">
        <h3 className="text-center text-teal-800">
          Confirm Details and Place Order
        </h3>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.length > 0 &&
                      cartItem.map((item) => (
                        <tr class="bg-gray-100 border-b" key={item.id}>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #
                          </td>

                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.product.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            $ {item.price.toFixed(2)}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.quantity}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            $ {(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot className="">
                    <tr className="bg-gray-100 border-b " scope="col">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cartItem
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="max-md:mt-3 mx-auto py-2 ml-2">
          {myAddress?.length == 0 && (
            <Link to="/main/shipping-address">
              <span className="text-teal-600">
                Click to Fill shipping Details
              </span>
            </Link>
          )}

          {myAddress?.length > 0 && (
            <div className="max-w-5xl my-3 lg:px-8 mx-auto">
              <h4>Your Shipping Address</h4>
              <div className=" h-[200px] bg-gray-200">
                <div className="w-[95%] mx-auto grid gap-3 py-4 px-8">
                  <div className="grid grid-cols-5 ">
                    <span className="col-span-2">ADDRESS</span>
                    <span className="col-span-3 uppercase">
                      {myAddress[0].address}
                    </span>
                  </div>
                  <div className="grid grid-cols-5">
                    <span className="col-span-2">CITY</span>
                    <span className="col-span-3 uppercase">
                      {myAddress[0].city}
                    </span>
                  </div>
                  <div className="grid grid-cols-5">
                    <span className="col-span-2">POSTAL CODE</span>
                    <span className="col-span-3 uppercase">
                      {myAddress[0].postalCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-5">
                    <span className="col-span-2">COUNTRY</span>
                    <span className="col-span-3 uppercase">
                      {myAddress[0].country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div id="card-element" class="mb-5"></div>
        </div>
        {/* <Button
          type="submit"
          onClick={submitForm}
          className="mt-5 max-w-4xl mx-auto"
        >
          Submit
        </Button> */}
        <div className="mt-5 max-w-4xl mx-auto">
          {showForm ? (
            <Stripe />
          ) : (
            <>
              <h3>
               $ {cartItem
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h3>
              <Button onClick={() => setShowForm(true)}>CLICK TO ORDER</Button>
            </>
          )}
        </div>
      </div>

      {/* <form>
        <PaymentElement />
        <button>Submit</button>
      </form> */}
    </Layout>
  );
};

export default Checkout;
