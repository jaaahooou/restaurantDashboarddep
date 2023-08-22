import axios from "axios";
import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
  ADD_DISH_TO_MENU_FAIL,
  ORDER_ACTIVE_DISH_LIST_REQUEST,
  ORDER_ACTIVE_DISH_LIST_SUCCESS,
  ORDER_ACTIVE_DISH_LIST_FAIL,
} from "../constants/dishConstants";

const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.userInfo);
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(userInfo.access),
    },
  };
};

// List all dishes
export const listDishes = () => async (dispatch) => {
  try {
    dispatch({ type: DISH_LIST_REQUEST });

    const config = getAuthConfig();
    const { data } = await axios.get("/dishes/get-dishes", config);

    dispatch({
      type: DISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List ordered dishes By order Id
export const listOrderDishes = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DISH_LIST_REQUEST });

    const config = getAuthConfig();
    const { data } = await axios.get("/dishes/get-order-dishes", config);

    const orderedDishes = data.filter((el) => el.order == id);

    dispatch({
      type: ORDER_DISH_LIST_SUCCESS,
      payload: orderedDishes,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List ordered active dishes
export const listActiveOrderDishes = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ACTIVE_DISH_LIST_REQUEST });

    const config = getAuthConfig();
    const { data } = await axios.get(
      "/dishes/get-active-ordered-dishes",
      config
    );

    dispatch({
      type: ORDER_ACTIVE_DISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ACTIVE_DISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDishToMenu =
  (category, dishName, dishPrice) => async (dispatch) => {
    try {
      const config = getAuthConfig();
      const body = {
        category,
        title: dishName,
        price: dishPrice,
      };

      const response = await axios.post("/dishes/add-dish", body, config);

      if (response.status === 200) {
        alert("Add new dish status: OK");
        dispatch(listDishes());
      } else {
        alert("Something went wrong, status code: " + response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You don't have permission to do that");
      }
      dispatch({
        type: ADD_DISH_TO_MENU_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editDish = (id, title, price) => async (dispatch) => {
  try {
    const config = getAuthConfig();
    const body = {
      title,
      price,
    };

    const response = await axios.put(`/dishes/edit-dish/${id}`, body, config);

    if (response.status === 200) {
      alert("Edit dish status: OK");
      dispatch(listDishes());
    } else if (response.status === 403) {
      alert("You don't have permission to do that");
    } else {
      alert("Something went wrong, status code: " + response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert("You don't have permission to do that");
    }
  }
};

export const removeDishFromMenu = (filteredDish) => async (dispatch) => {
  try {
    const config = getAuthConfig();
    console.log(filteredDish);
    await axios.delete(`/dishes/delete-dish/${filteredDish.id}`, config);

    alert("Remove dish status: OK");
    dispatch(listDishes());
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert("You don't have permission to do that");
    } else {
      alert("Something went wrong");
    }
  }
};

export const setActiveDishAsInactive = (id) => async (dispatch) => {
  try {
    const config = getAuthConfig();
    const body = {};
    await axios.put(`/dishes/set-active-dish-as-inactive/${id}`, body, config);

    alert("Status: OK");
    dispatch(listActiveOrderDishes());
  } catch (error) {
    alert(error);
  }
};
