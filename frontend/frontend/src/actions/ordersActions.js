import axios from "axios";
import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ADD_NEW_ITEM,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  PAST_ORDERS_LIST_SUCCESS,
  PAST_ORDERS_LIST_REQUEST,
  PAST_ORDERS_LIST_FAIL,
  CHANGE_DISH_QTY,
  CHANGE_PAYMENT_METHOD,
} from "../constants/orderConstants";
import { listOrderDishes } from "./dishActions";

// Helper function for JWT authorization headers
const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.userInfo);
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.access}`,
    },
  };
};

// Helper function for error handling
const handleError = (error, dispatch, actionType) => {
  const errorMessage =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  dispatch({ type: actionType, payload: errorMessage });
};

export const createOrder = (id, orders) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const config = getAuthConfig();
    const body = {};

    const { data } = await axios.post(
      `/orders/create-order/${id}`,
      body,
      config
    );

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    window.location.href = `/#/orders/order/${data.id}`;
  } catch (error) {
    handleError(error, dispatch, ORDER_CREATE_FAIL);
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const config = getAuthConfig();
    const { data } = await axios.get("/orders/get-orders", config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_LIST_FAIL);
  }
};

export const listPastOrders = () => async (dispatch) => {
  try {
    dispatch({ type: PAST_ORDERS_LIST_REQUEST });
    const { data } = await axios.get("/orders/past-orders");
    dispatch({ type: PAST_ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, PAST_ORDERS_LIST_FAIL);
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = getAuthConfig();
    const { data } = await axios.get(`/orders/get-order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ORDER_DETAILS_FAIL);
  }
};

export const changeDishQty =
  (dish, dishQty, orderId, dishFromMenu) => async (dispatch) => {
    let priceValueToChange;

    if (dish.qty !== dishQty) {
      priceValueToChange = (dishQty - dish.qty) * dishFromMenu.price;
      console.log(priceValueToChange);

      //replace old value of dish qty by new
      dish.qty = dishQty;

      try {
        dispatch({
          type: CHANGE_DISH_QTY,
          payload: {
            dish,
            orderId,
            priceValueToChange,
          },
        });

        const body = {
          qty: dish.qty,
        };
        const config = getAuthConfig();

        const orderedDish = await axios.post(
          `/orders/update-qty/${dish.id}`,
          body,
          config
        );
        if (orderedDish.status === 200) {
          dispatch(listOrderDishes(orderId));
        } else {
          alert("Something went wrong, status code: ", orderedDish.status);
        }
      } catch (error) {
        handleError(error, dispatch, ORDER_DETAILS_FAIL);
      }
    }
  };

export const addToOrder = (filteredDish, id, qty) => async (dispatch) => {
  dispatch({
    type: ORDER_ADD_NEW_ITEM,
    payload: {
      id,
      filteredDish,
      qty,
    },
  });

  const body = {
    dish: filteredDish.id,
    order: id,
    qty: qty,
    price: filteredDish.price,
  };
  const config = getAuthConfig();

  const { dishToAdd } = await axios.post(
    "/orders/add-dish-to-order",
    body,
    config
  );
};

export const updatePaymentMethod = (id, paymentMethod) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PAYMENT_METHOD,
      payload: {
        paymentMethod,
      },
    });

    const body = {
      paymentMethod: paymentMethod,
      id: id.id,
    };
    const config = getAuthConfig();

    await axios.post(`/orders/update-payment-method/${id}`, body, config);
  } catch (error) {
    handleError(error, dispatch, ORDER_DETAILS_FAIL);
  }
};
