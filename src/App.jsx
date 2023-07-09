import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AppHome from "./pages/AppHome";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppHome />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
