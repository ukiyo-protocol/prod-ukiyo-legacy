import { useAppSelector } from "../../../hooks/hooks";
import { FC } from "react";
import { Navigate } from "react-router-dom";

type props ={
  Component:any;
}

const AdminAuthGuard = ({ Component }: props) => {
  const adminAddress = useAppSelector((state) => state.user.walletAddress);
  const isAdminLogin = useAppSelector((state) => state.user.isAdmin);

  if (adminAddress && isAdminLogin) {
    return <Component />;
  } else {
    return (
      <>
        <Navigate to="/admin/login" />{" "}
      </>
    );
  }

};

export default AdminAuthGuard;
