import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layouts/DashboardLayout";
import DashBoard from "./pages/Dashboard";
import Result from "./pages/Result";
import Settings from "./pages/Settings";
import History from "./pages/History";
import JobApplication from "./pages/JobApplications";
import AddApplication from "./pages/AddApplication";
import { Toaster } from "sonner";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";



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
          <Route path="/analysis" element={<ResumeAnalyzer/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/result" element={<Result />} />
          <Route path="/jobapplication" element={<JobApplication/>}/>
          <Route path="/addapplication" element={<AddApplication/>}/>
        </Route>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
