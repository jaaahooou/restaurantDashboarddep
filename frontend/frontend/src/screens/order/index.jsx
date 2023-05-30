import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { listOrderDishes } from "../../actions/dishActions";
import { listDishes } from "../../actions/dishActions";
import {
  getOrderDetails,
  addToOrder,
  removeFromOrder,
  deleteFromOrder,
} from "../../actions/ordersActions";
import { listCategories } from "../../actions/categoriesActions";
import { LoginMessageComponent } from "../../components/LoginMessageComponent";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OrderDetails from "../../components/orderComponents/OrderDetails";

import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Order() {
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, orderDetail } = orderDetails;

  const orderDishList = useSelector((state) => state.orderDishList);
  const {
    error: errorDishList,
    loading: loadingDishList,
    orderDishes,
  } = orderDishList;

  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { categoriesError, categoriesLoading, categories } = categoriesList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  const [isPaid, setIsPaid] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    dispatch(listDishes());
    dispatch(listOrderDishes(id));
    dispatch(listCategories());

    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const setOrderAsPaid = async () => {
    setIsPaid(!isPaid);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
      body: {
        isPaid: true,
      },
    };

    const { setOrderAsPaid } = await axios.post(
      `/orders/update-order/${id}`,
      config
    );
  };
  const openAndCloseMenu = async () => {
    setOpenMenu(!openMenu);
  };

  const buttonHandler = () => {
    console.log(isDisabled);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1200);
  };

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <Box sx={{ margin: "20px auto 5px" }}>
      {userLogin.userInfo.id ? (
        <>
          <div
            className="order-new"
            style={{
              marginTop: "30px",
            }}
          >
            <OrderDetails orderDishes={orderDishes} dishList={dishList} />
          </div>

          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{ margin: "0 15px 10px 15px" }}
            >
              <Item>Payment method :{orderDetails.order.paymentMethod}</Item>
              <Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOrderAsPaid(id);
                  navigate("/orders");
                }}
              >
                {isPaid ? "Is paid" : "Set as paid nad remove order"}
              </Item>
              <Item>{orderDetails.order.isPaid ? "is paid" : "not paid"}</Item>
            </Stack>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dish</TableCell>
                  <TableCell align="center">Qty.</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      paddingLeft: "0",
                      paddingRight: "0",
                    }}
                    size="small"
                  >
                    Unit
                  </TableCell>

                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDishes.map((filteredDish) => (
                  <TableRow key={filteredDish.id}>
                    <TableCell>
                      {dishList.dishes
                        .filter(
                          (dishToDisplay) =>
                            dishToDisplay.id == filteredDish.dish
                        )
                        .map((filteredDishToDisplay) => (
                          <div key={filteredDishToDisplay.id}>
                            {filteredDishToDisplay.title}
                          </div>
                        ))}
                    </TableCell>

                    <TableCell className="changePadding" align="center">
                      <IconButton
                        className="changePadding"
                        aria-label="add"
                        disabled={isDisabled}
                        onClick={() => {
                          // dispatch(increaseDishQty(filteredDish, id));
                          setIsDisabled(true);
                          buttonHandler();
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      {filteredDish.qty}

                      <IconButton
                        disabled={isDisabled}
                        className="changePadding"
                        aria-label="delete"
                      >
                        {" "}
                        {filteredDish.qty > 1 ? (
                          <RemoveIcon
                            className="changePadding"
                            disabled={isDisabled}
                            onClick={() => {
                              dispatch(
                                removeFromOrder(filteredDish, id, orderDishes)
                              );
                              setIsDisabled(true);
                              buttonHandler();
                            }}
                          />
                        ) : (
                          <DeleteOutlineIcon
                            disabled={isDisabled}
                            onClick={() => {
                              dispatch(deleteFromOrder(filteredDish, id));
                              dispatch(listOrderDishes(id));
                              setIsDisabled(true);
                              buttonHandler();
                            }}
                          />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      style={{
                        paddingLeft: "0",
                        paddingRight: "0",
                      }}
                      align="center"
                      size="small"
                    >
                      {" "}
                      {dishList.dishes
                        .filter(
                          (dishToDisplay) =>
                            dishToDisplay.id == filteredDish.dish
                        )
                        .map((filteredDishToDisplay) => (
                          <div key={filteredDishToDisplay.id}>
                            {filteredDishToDisplay.price}
                          </div>
                        ))}
                    </TableCell>

                    <TableCell align="right">
                      {dishList.dishes
                        .filter(
                          (dishToDisplay) =>
                            dishToDisplay.id == filteredDish.dish
                        )
                        .map((filteredDishToDisplay) => (
                          <div key={filteredDishToDisplay.id}>
                            {(
                              filteredDishToDisplay.price * filteredDish.qty
                            ).toFixed(2)}
                          </div>
                        ))}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={1} colSpan={4}>
                    <Button
                      onClick={() => {
                        openAndCloseMenu();
                      }}
                    >
                      {openMenu ? "Close menu" : "Add new dish"}
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell rowSpan={3} />

                  <TableCell colSpan={1}>Total</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        dispatch(getOrderDetails(id));
                        dispatch(listOrderDishes(id));
                      }}
                    >
                      recalculate
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    {orderDetails.order.totalPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* This menu opens after the user clicks on the "add new dish" button */}
          {openMenu ? (
            <Box style={{ margin: "20px" }} sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
              >
                {categories.map((category) => (
                  <Grid item xs={1} sm={4} md={4} key={category.id}>
                    <Item>
                      <Typography variant="h4" align="left">
                        {category.title}
                      </Typography>

                      <TableContainer component={Paper}>
                        <Table
                          sx={{ maxWidth: "100%" }}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dishes
                              .filter((dish) => dish.category === category.id)
                              .map((filtereDish) => (
                                <TableRow
                                  key={filtereDish.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {filtereDish.title}
                                  </TableCell>

                                  <TableCell align="right">
                                    {filtereDish.price}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      onClick={() => {
                                        dispatch(addToOrder(filtereDish, id));
                                      }}
                                    >
                                      <AddIcon />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <></>
          )}
        </>
      ) : (
        <LoginMessageComponent />
      )}
    </Box>
  );
}
