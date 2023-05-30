import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_DELETE_ITEM,
  ORDER_ADD_NEW_ITEM,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  PAST_ORDERS_LIST_SUCCESS,
  PAST_ORDERS_LIST_REQUEST,
  PAST_ORDERS_LIST_FAIL,
  CHANGE_DISH_QTY,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
} from "../constants/orderConstants";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const createOrder = (id, orders) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.post(`/orders/create-order/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.id}`,
      },
      body: {
        user: userInfo.id,
      },
    });

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    window.location.href = `/#/orders/order/${data.id}`;
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    console.log(error);
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get("/orders/get-orders");
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPastOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: PAST_ORDERS_LIST_REQUEST,
    });

    const { data } = await axios.get("/orders/past-orders");
    dispatch({
      type: PAST_ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAST_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        //Authorization: "Bearer " + String(authTokens.access),
      },
    };
    const { data } = await axios.get(`/orders/get-order/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// This function will be removed
// export const increaseDishQty = (filteredDish, id) => async (dispatch) => {
//   const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

//   dispatch({
//     type: ORDER_ADD_ITEM,
//     payload: {
//       data,
//       id,
//       filteredDish,
//     },
//   });

//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: {
//       order: data.orderedDishData.order,
//       dish: data.orderedDishData.dish,
//       qty: data.orderedDishData.qty + 1,
//     },
//   };

//   const { orderedDish } = await axios.post(
//     `/orders/update-qty/${filteredDish.id}`,
//     config
//   );
// };

// =============== CHANGE DISH QTY ==========================
export const changeDishQty = (dish, dishQty) => async (dispatch) => {
  //replace old value of dish qty by new
  dish.qty = dishQty;
  console.log(dish);

  try {
    dispatch({
      type: CHANGE_DISH_QTY,
      payload: {
        dish,
      },
    });

    // New value of qty
    const body = {
      qty: dish.qty,
    };

    // Authorization - userInfo is ssending to backend
    let userInfo = JSON.parse(localStorage.userInfo);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(userInfo.access),
      },
    };

    //Send POST metod to backend with changed dish qty
    const { orderedDish } = await axios.post(
      `/orders/update-qty/${dish.id}`,
      body, // if POST request, axios send headers as third parameter
      config
    );
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// =============== END ==== CHANGE DISH QTY =========== END ===============

// =============== ADD NEW DISH TO ORDER ==========================

export const addToOrder = (filteredDish, id) => async (dispatch) => {
  console.log("Fire off addToORder");

  dispatch({
    type: ORDER_ADD_NEW_ITEM,
    payload: {
      id,
      filteredDish,
    },
  });

  const body = {
    dish: filteredDish.id,
    order: id,
    qty: 1,
    price: filteredDish.price,
  };
  // Get userInfo from local storage and send it to backend for JWT authorization
  let userInfo = JSON.parse(localStorage.userInfo);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(userInfo.access),
    },
  };

  const { dishToAdd } = await axios.post(
    `/orders/add-dish-to-order`,
    body,
    config
  );
  //window.location.reload();

  // if (ordereDishExist.length > 0) {
  //   alert("Dish you want to add already exist in order. Try to increase qty");
};

export const removeFromOrder = (filteredDish, id) => async (dispatch) => {
  //filteredDish - dish we want to change
  //id - order id
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: {
      data,
      id,
      filteredDish,
    },
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    body: {
      order: data.orderedDishData.order,
      dish: data.orderedDishData.dish,
      qty: data.orderedDishData.qty - 1,
    },
  };

  const { orderedDish } = await axios.post(
    `/orders/update-qty/${filteredDish.id}`,
    config
  );
};

export const deleteFromOrder = (filteredDish, id) => async (dispatch) => {
  //filteredDish - dish we want to change
  //id - order id
  const { data } = await axios.get(`/dishes/get-order-dish/${filteredDish.id}`);

  dispatch({
    type: ORDER_DELETE_ITEM,
    payload: {
      data,
      id,
      filteredDish,
    },
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { orderedDish } = await axios.delete(
    `/orders/remove-dish-from-order/${filteredDish.id}`,
    config
  );

  window.location.reload();
};
