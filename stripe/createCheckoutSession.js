import getStripe from "./initializeStripe";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

const MONTHLY = "price_1Nl0ATDwmieLVZlhyHeI9t2S";
const YEARLY = "price_1Nl0BLDwmieLVZlhtq7KXQEz";

export async function createCheckoutSession(uid, model) {
  const db = getFirestore();
  const id = uuid();
  let currentModel = MONTHLY;
  if (model === "Yearly") {
    currentModel = YEARLY;
  }
  try {
    const checkoutSessionDoc = doc(db, `users/${uid}/checkout_sessions/${id}`);
    const checkoutSessionData = {
      price: currentModel,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    };
    await setDoc(checkoutSessionDoc, checkoutSessionData);
  } catch (error) {
    console.log("Error creating checkout session");
    console.log(error);
    return false;
  }
  onSnapshot(doc(db, `users/${uid}/checkout_sessions/${id}`), async (doc) => {
    const { sessionId } = doc.data();
    if (sessionId) {
      try {
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
        return true;
      } catch (error) {
        console.log("Error redirecting to Stripe: ", error);
        return false;
      }
    }
  });
}
