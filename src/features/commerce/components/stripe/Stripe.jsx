import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const stripe = loadStripe(
  "pk_test_51LQs56J4Ld6rviALPnQLvUPnnaUHi6QZEhZlnlgd05vMnnV8heo68vCyyykfPe8IBt3YY68aiQD76zteuufBhO9w00sP1Jvl6C"
);
const Stripe = () => {
  return (
    <Elements stripe={stripe}>
      <PaymentForm />
    </Elements>
  );
};

export default Stripe;
