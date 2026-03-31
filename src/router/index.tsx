import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import FormReport from "../pages/FormReport";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* <Route path="/login" element={<Login />} /> */}
       <Route path="/report" element={<FormReport />} />
      </Routes>
    </BrowserRouter>
  );
}