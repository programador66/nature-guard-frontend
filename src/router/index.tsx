import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import FormReport from "../pages/FormReport";
import FormReportDetails from "../pages/FormReportDetails";
import ReportListPage from "../pages/ReportListPage";
import MyReportsPage from "../pages/MyReportsPage";
import EditReportPage from "../pages/EditReportPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-report" element={<FormReport />} />
        <Route path="/create-report-details" element={<FormReportDetails />} />
        <Route path="/reports-list-page" element={<ReportListPage />} />
        <Route path="/my-reports" element={<MyReportsPage />} />
        <Route path="/edit-report/:id" element={<EditReportPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
