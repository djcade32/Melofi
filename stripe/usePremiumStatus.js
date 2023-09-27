import { useState, useEffect } from "react";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user) {
  const [premiumStatus, setPremiumStatus] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async function () {
      setPremiumStatus(await isUserPremium());
    };
    checkPremiumStatus();
  }, [user]);

  return premiumStatus;
}
