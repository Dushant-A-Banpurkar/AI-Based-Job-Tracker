import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layouts/DashboardLayout";

const querryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={querryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="dashboard" element={<DashboardLayout/>}/>
        <Route path="/register" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
