import React from "react";
import { Route, Routes } from "react-router-dom";

// import AppHome from "./pages/AppHome";
const AppHome = React.lazy(() => import("./pages/AppHome"));

import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
