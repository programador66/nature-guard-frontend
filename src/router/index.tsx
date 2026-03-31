import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import FormReport from "../pages/FormReport";
import FormReportDetails from "../pages/FormReportDetails";
import ReportListPage from "../pages/ReportListPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
       <Route path="/create-report" element={<FormReport />} />
       <Route path="/create-report-details" element={<FormReportDetails />} />
       <Route path="/reports-list-page" element={<ReportListPage />} />
      </Routes>
    </BrowserRouter>
  );
}