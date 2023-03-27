import axios from "axios";

import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  ORDER_DISH_LIST_REQUEST,
  ORDER_DISH_LIST_SUCCESS,
  ORDER_DISH_LIST_FAIL,
  ADD_DISH_TO_MENU,
  ADD_DISH_TO_MENU_FAIL,
  REMOVE_DISH_FROM_MENU,
  REMOVE_DISH_FROM_MENU_FAIL,
} from "../constants/dishConstants";

export const listDishes = () => async (dispatch) => {
  try {
    dispatch({ type: DISH_LIST_REQUEST });
    const { data } = await axios.get("/dishes/get-dishes");
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

export const listOrderDishes = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DISH_LIST_REQUEST });
    const { data } = await axios.get("/dishes/get-order-dishes");

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

export const addDishToMenu =
  (category, categoryId, dishName, dishPrice, dishes) => async (dispatch) => {
    const dishData = {
      id: dishes.length,
      category: categoryId,
      title: dishName,
      price: dishPrice,
      countInStock: 100,
    };

    try {
      dispatch({
        type: ADD_DISH_TO_MENU,
        payload: {
          dishData,
          dishes,
        },
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
        body: {
          category: category,
          title: dishName,
          price: dishPrice,
        },
      };
      const { data } = await axios.post("/dishes/add-dish", config);
    } catch (error) {
      dispatch({
        type: ADD_DISH_TO_MENU_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeDishFromMenu =
  (dishes, filteredDish) => async (dispatch) => {
    console.log("Dishes: ", dishes);
    console.log("Filtered dish: ", filteredDish);

    const dishesAfterRemove = dishes.filter((el) => el.id != filteredDish.id);

    try {
      dispatch({
        type: REMOVE_DISH_FROM_MENU,
        payload: {
          dishesAfterRemove,
        },
      });
    } catch (error) {
      dispatch({
        type: REMOVE_DISH_FROM_MENU_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { removedDish } = await axios.delete(
      `/dishes/delete-dish/${filteredDish.id}`,
      config
    );
  };
