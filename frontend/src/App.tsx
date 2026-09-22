import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import History from "./pages/History";
import JobApplication from "./pages/JobApplications";
import AddApplication from "./pages/AddApplication";
import { Toaster } from "sonner";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import AnalysisResult from "./pages/AnalyisResults";
import UpdateApplication from "./pages/UpdateApplication";



const querryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={querryClient}>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/analyzer" element={<ResumeAnalyzer/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/analysis" element={<AnalysisResult />} />
          <Route path="/analysis/:id" element={<AnalysisResult />} />
          <Route path="/jobapplication" element={<JobApplication/>}/>
          <Route path="/addapplication" element={<AddApplication/>}/>
          <Route path="/updateapplication/:id" element={<UpdateApplication/>}/>
        </Route>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
