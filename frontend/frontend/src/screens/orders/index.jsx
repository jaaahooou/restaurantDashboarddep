import * as React from "react";

import { listTables, listRooms } from "../../actions/tablesActions";
import { getUsers } from "../../actions/userActions";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { LinkContainer } from "react-router-bootstrap";
import "@fontsource/public-sans";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { listOrders, listPastOrders } from "../../actions/ordersActions";
import { LoginMessageComponent } from "../../components/LoginMessageComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const pastOrdersList = useSelector((state) => state.pastOrdersList);
  const {
    error: pastOrdersListError,
    loading: pastOrdersListLoading,
    pastOrders,
  } = pastOrdersList;

  const userList = useSelector((state) => state.userList);
  const { error: userListError, loading: userListloading, users } = userList;

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  const [openPastOrders, setOpenPastOrders] = useState(false);

  useEffect(() => {
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
    <Box
      sx={{ margin: "15px auto", maxWidth: "1366px" }}
      sm={{ marginTop: "200px" }}
    >
      <div>
        <h1>Orders</h1>
      </div>
      {userLogin.userInfo.id ? (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ margin: "25px 15px 10px 15px" }}
          >
            <Item
              style={{
                cursor: "pointer",
                backgroundColor: openPastOrders ? "#1A2027" : "green",
              }}
              onClick={() => {
                setOpenPastOrders(false);
              }}
            >
              Current orders
            </Item>

            <Item
              style={{
                cursor: "pointer",
                backgroundColor: openPastOrders ? "green" : "#1A2027",
              }}
              onClick={() => {
                setOpenPastOrders(true);
                dispatch(listPastOrders());
              }}
            >
              Past orders
            </Item>
          </Stack>

          <TableContainer className="orders-container" component={Paper}>
            <Table aria-label="customized table">
              {openPastOrders ? (
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Waiter</StyledTableCell>
                    <StyledTableCell align="center">
                      Total price
                    </StyledTableCell>
                    <StyledTableCell align="center">Payment</StyledTableCell>
                    <StyledTableCell align="center">shipping</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
              ) : (
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Table no</StyledTableCell>
                    <StyledTableCell align="center">Room</StyledTableCell>
                    <StyledTableCell align="center">Person</StyledTableCell>
                    <StyledTableCell align="center">Details</StyledTableCell>
                  </TableRow>
                </TableHead>
              )}

              {openPastOrders ? (
                <>
                  {pastOrders ? (
                    <TableBody>
                      {pastOrders.map((order) => (
                        <StyledTableRow key={order.id}>
                          {users ? (
                            <StyledTableCell align="left">
                              {" "}
                              {users
                                .filter((user) => user.id == order.user)
                                .map((filteredUsers) => (
                                  <div key={filteredUsers.id}>
                                    {filteredUsers.first_name}
                                  </div>
                                ))}
                            </StyledTableCell>
                          ) : (
                            <div>name</div>
                          )}

                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {order.totalPrice}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {order.paymentMethod}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {order.shipping}
                          </StyledTableCell>

                          <StyledTableCell align="right">
                            {order.createdAt.toString().slice(0, 10)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <CircularProgress color="secondary" />
                  )}
                </>
              ) : (
                <TableBody>
                  {orders.map((order) => (
                    <StyledTableRow key={order.id}>
                      <StyledTableCell component="th" scope="row">
                        {order.table}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {tables
                          .filter((table) => table.id == order.table)
                          .map((filteredTable) => (
                            <div key={filteredTable.id}>
                              {" "}
                              {rooms
                                .filter((room) => room.id == filteredTable.room)
                                .map((filteredRoom) => (
                                  <div key={filteredRoom.id}>
                                    {filteredRoom.name}
                                  </div>
                                ))}
                            </div>
                          ))}
                      </StyledTableCell>
                      {users ? (
                        <StyledTableCell align="center">
                          {" "}
                          {users
                            .filter((user) => user.id == order.user)
                            .map((filteredUsers) => (
                              <div key={filteredUsers.id}>
                                {filteredUsers.first_name}
                              </div>
                            ))}
                        </StyledTableCell>
                      ) : (
                        <div>name</div>
                      )}

                      <StyledTableCell
                        style={{ cursor: "pointer" }}
                        align="center"
                      >
                        <LinkContainer
                          component="button"
                          to={`order/${order.id}`}
                          onClick={() => {
                            console.log("Clicked");
                          }}
                        >
                          <Button variant="contained">details</Button>
                        </LinkContainer>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </>
      ) : (
        <LoginMessageComponent />
      )}
    </Box>
  );
}
