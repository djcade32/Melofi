import { getAuth } from "firebase/auth";
import firebaseClient from "../firebase/firebaseClient";

const auth = getAuth(firebaseClient);

export default async function isUserPremium() {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  return decodedToken?.claims?.stripeRole ? true : false;
}
