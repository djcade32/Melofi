import React from "react";
import { Route, Routes } from "react-router-dom";

// import AppHome from "./pages/AppHome";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
const AppHome = React.lazy(() => import("./pages/AppHome"));
// const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));

import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsConditions" element={<TermsAndConditions />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
