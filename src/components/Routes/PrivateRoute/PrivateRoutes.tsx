import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Pages/AdminPanel/AdminDashboard/AdminDashboard";
import AdminLogin from "../../Pages/AdminPanel/AdminLogin/AdminLogin";
import AdminSetting from "../../Pages/AdminPanel/AdminSetting/AdminSetting";
import Kyc from "../../Pages/AdminPanel/Kyc/Kyc";
import AdminTransactionHistory from "../../Pages/AdminPanel/TransactionHistory/AdminTransactionHistory";
import About from "../../Pages/LandingPage/Components/AboutSec/AboutSec";
import Dashboard from "../../Pages/UserPanel/Dashboard/Dashboard";
import KycRecord from "../../Pages/UserPanel/KycRecord/KycRecord";
import Login from "../../Pages/UserPanel/Login/Login";
import Profile from "../../Pages/UserPanel/Profile/Profile";
import Register from "../../Pages/UserPanel/Register/Register";
import ChangePassword from "../../Pages/UserPanel/ResetPassword/ChangePassword";
import ResetPassword from "../../Pages/UserPanel/ResetPassword/ResetPassword";
import VerificationCode from "../../Pages/UserPanel/ResetPassword/VerificationCode";
import TransactionHistory from "../../Pages/UserPanel/TransactionHistory/TransactionHistory";
import UserAuthGuard from "../Guard/UserAuthGuard";

const path = "auth";

const PrivateRoute = () => {
  return (
    <>
      <Routes>
        <Route path={path} element={<About />}></Route>

        {/* route for user panel */}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerificationCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/*
        <Route path="/dashboard" element={<UserAuthGuard component={Dashboard} />} />
        <Route path="/profile" element={<UserAuthGuard component={Profile} />} />
        <Route path="/kyc-record" element={<UserAuthGuard component={KycRecord} />} />
        <Route path="/transaction-history" element={<UserAuthGuard component={TransactionHistory} />} /> */}


        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/kyc-record" element={<KycRecord />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />

        <Route path="admin">
          <Route path="login" element={<AdminLogin />} />
          <Route path="kyc" element={<Kyc />} />
          <Route path="reset-password" element={<ResetPassword />} />
          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
          <Route path="settings" element={<AdminSetting />} />
          <Route path="transaction-history" element={<AdminTransactionHistory />} />
        </Route>

        {/* route for admin internal pages */}
      </Routes>
    </>
  );
};

export default PrivateRoute;
