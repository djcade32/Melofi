import getStripe from "./initializeStripe";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import uuid from "react-uuid";

export async function createCheckoutSession(uid) {
  const db = getFirestore();
  const id = uuid();

  let checkoutSessionRef = null;

  try {
    const checkoutSessionDoc = doc(db, `users/${uid}/checkout_sessions/${id}`);
    const checkoutSessionData = {
      price: "price_1Na5SaDwmieLVZlh4BMB8uZb",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    };
    await setDoc(checkoutSessionDoc, checkoutSessionData);
  } catch (error) {
    console.log("Error creating checkout session");
    console.log(error);
  }

  onSnapshot(doc(db, `users/${uid}/checkout_sessions/${id}`), async (doc) => {
    const { sessionId } = doc.data();
    console.log("session: ", sessionId);

    if (sessionId) {
      try {
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.log("Error redirecting to Stripe: ", error);
      }
    }
  });
}
