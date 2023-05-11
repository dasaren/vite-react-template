import React, { useEffect, useState } from "react";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, orderProducts } from "features/commerce/Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const { cartItem } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  console.log("oboso", cartItem);
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const stripe = useStripe();
  const elements = useElements();
  const see = cartItem
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/api/ord/myc-checkout/",
          {
            amount: see,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "black" },
        "::placeholder": { color: "black" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black",
      },
    },
  };
  const navigate = useNavigate();
  const paymentSuccessful = () => {
    dispatch(orderProducts({ paid_amount: see, ordered_items: cartItem }));
    navigate("/main/shipping-thank-you");
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardExpiryElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardCvcElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <div className=" mt-5 max-w-4xl mx-auto">
            <Button onClick={paymentSuccessful}>Pay </Button>
          </div>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank you for your patronage</h3>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
