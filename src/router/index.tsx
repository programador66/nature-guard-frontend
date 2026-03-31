import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import FormReport from "../pages/FormReport";
import FormReportDetails from "../pages/FormReportDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
       <Route path="/report" element={<FormReport />} />
       <Route path="/report/details" element={<FormReportDetails />} />
      </Routes>
    </BrowserRouter>
  );
}