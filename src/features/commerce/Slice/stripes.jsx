import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51LQs56J4Ld6rviALPnQLvUPnnaUHi6QZEhZlnlgd05vMnnV8heo68vCyyykfPe8IBt3YY68aiQD76zteuufBhO9w00sP1Jvl6C"
    );
  }
  return stripePromise;
};

export default getStripe;
