import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  }
  return stripePromise;
};

export default initializeStripe;
