import * as React from "react";
import { useState } from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers, getEmployees } from "../../actions/userActions";
import { listOrders } from "../../actions/ordersActions";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/system";

import CircularProgress from "@mui/material/CircularProgress";
import "@fontsource/public-sans";

import { TablesComponent } from "../../components/adminComponents/TablesComponent";
import { StaffComponent } from "../../components/adminComponents/StaffComponent";
import { MenuComponent } from "../../components/adminComponents/MenuComponent";
import { LoginMessageComponent } from "../../components/LoginMessageComponent";
import { SalesComponent } from "../../components/adminComponents/SalesComponent";

import styled from "styled-components";
import "../../css/admin.css";

const Button = styled.button``;

const ButtonToggle = styled(Button)`
  ${({ active }) =>
    active &&
    `
  
  
  font-size: 1.6rem;
  margin-right:25px;
  color:bisque
  
  
  `}
`;

const menuItems = [
  { title: "Sales", component: <SalesComponent /> },
  { title: "Staff", component: <SalesComponent /> },
  { title: "Rooms management", component: <SalesComponent /> },
  { title: "Menu Management", component: <SalesComponent /> },
];

export default function Admin() {
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  const [active, setActive] = useState(menuItems[0]);
  console.log(active);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getUsers());
    dispatch(listOrders());
    dispatch(listTables());
    dispatch(listRooms());
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Box sx={{ margin: "15px auto" }}>
      <div>
        <h1>Admin Panel</h1>
      </div>
      {userLogin.userInfo.id ? (
        <>
          <div className="admin-main">
            {menuItems.map((item, index) => (
              <ButtonToggle
                key={index}
                className="admin-button-mobile"
                active={active === item.title}
                onClick={() => {
                  setActive(item.title);
                  console.log(active);
                }}
              >
                {item.title}
              </ButtonToggle>
            ))}
          </div>

          <div>
            {" "}
            {active.title === undefined ? (
              <div>{active}</div>
            ) : (
              <div>{active.title}</div>
            )}
          </div>

          {/* <StaffComponent />
          <TablesComponent />
          <MenuComponent /> */}
        </>
      ) : (
        <LoginMessageComponent />
      )}
    </Box>
  );
}
