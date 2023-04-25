import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import logo from "../../assets/Images/ukiyo-main.svg";
import cross from "../../assets/Images/cross-mark.svg";
import menu from "../../assets/Images/menu.svg";
import "react-pro-sidebar/dist/css/styles.css";
import "./SidebarStyle.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardIcon,
  DocIcon,
  LogoutIcon,
  TransactionIcon,
  UserIcon,
} from "../../assets/SvgIcons/SvgIcons";

import { useAppDispatch } from '../../hooks/hooks';
import { disconnectWallet } from "../../redux/actions/connect.action";
import { IReduxUserDetails } from "../../interfaces/store";
import { useSelector } from "react-redux";
import DisconnectModal from "../common/DisconnectModal/DisconnectModal";
import Toast from "../common/Toast";
import { ADMIN_PATH } from "../../constants/messages";
import * as types from "../../redux/actionTypes"

const Sidebar = () => {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetails: IReduxUserDetails = useSelector((state: any) =>
    state.user.walletAddress ? state.user : false
  );


  const [view, setView] = useState(false);
  const viewClose = () => setView(false);
  const viewShow = () => setView(true);




  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };


  //Function to disconnect wallet
  const disconnectHandler = async () => {
    dispatch({ type: types.TOKEN, payload: "" });
    dispatch(disconnectWallet(userDetails?.wallet));
    Toast.success("Logout successfully");
    setView(false);
    navigate('/login');
  };

  //Function to disconnect admin
  const disconnectAdminHandler = async () => {
    dispatch(disconnectWallet(userDetails?.wallet));
    navigate(ADMIN_PATH.LOGIN);
    Toast.success("Logout successfully");
  };

  return (
    <>
      <div className="closemenu" onClick={menuIconClick}>
        {menuCollapse ? (
          <img src={menu} alt="icon" />
        ) : (
          <img src={cross} alt="icon" />
        )}
      </div>
      <ProSidebar className="sidebarStyle" collapsed={menuCollapse}>
        <SidebarHeader>
          {menuCollapse ? "" : <img src={logo} alt="logo" />}
        </SidebarHeader>
        <SidebarContent>
          {location.pathname.includes('admin') ?
            // for admin panel
            <Menu>
              <MenuItem>
                <NavLink to="/admin/dashboard">
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/admin/kyc">
                  <DocIcon />
                  KYC
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/admin/transaction-history">
                  <TransactionIcon />
                  Transaction History
                </NavLink>
              </MenuItem>
              {/* <MenuItem>
                <NavLink to="/admin/settings">
                  <TransactionIcon />
                  Settings
                </NavLink>
              </MenuItem> */}
              <MenuItem>
                <NavLink to="/admin/login"
                  onClick={() => (disconnectAdminHandler())}
                >
                  <LogoutIcon />
                  Logout
                </NavLink>
              </MenuItem>
            </Menu>
            :
            // for user panel
            <Menu>
              <MenuItem>
                <NavLink to="/dashboard">
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/profile">
                  <UserIcon />
                  Profile
                </NavLink>
              </MenuItem>
              {/* <MenuItem>
                <NavLink to="/kyc-record">
                  <DocIcon />
                  KYC
                </NavLink>
              </MenuItem> */}
              <MenuItem>
                <NavLink to="/transaction-history">
                  <TransactionIcon />
                  Transaction History
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to='/'
                  // onClick={() => dispatch({ type: actionTypes.TOKEN, payload: '' })}
                  onClick={(e: any) => (disconnectHandler())}

                >
                  <LogoutIcon />
                  Logout
                </NavLink>
              </MenuItem>
            </Menu>}
        </SidebarContent>
      </ProSidebar>
      <DisconnectModal
        show={view}
        viewShow={viewShow}
        viewClose={viewClose}
        callback={disconnectHandler}
      />
    </>
  );
};

export default Sidebar;
