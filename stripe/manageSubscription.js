import { getFunctions, httpsCallable } from "firebase/functions";

export async function manageSubscription() {
  const functions = getFunctions();
  const customerPortal = httpsCallable(functions, "ext-firestore-stripe-payments-createPortalLink");
  try {
    const { data } = await customerPortal({ returnUrl: window.location.origin });
    window.location.assign(data.url);
  } catch (error) {
    console.log("Error retrieving billing subscription information: ", error);
  } finally {
    return false;
  }
}
