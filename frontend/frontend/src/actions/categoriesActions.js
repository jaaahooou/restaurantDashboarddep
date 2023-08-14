import {
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_FAIL,
} from "../constants/categoriesConstants";

import axios from "axios";

const handleRequestError = (error) => {
  if (error.response?.status === 403) {
    alert("You don't have permission to do that");
  } else {
    alert("Something went wrong, status code: " + error.response?.status);
  }
};

const getHeadersConfig = () => {
  let userInfo = JSON.parse(localStorage.userInfo);
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(userInfo.access),
    },
  };
};

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });
    const config = getHeadersConfig();
    const { data } = await axios.get("dishes/get-categories", config);
    dispatch({
      type: CATEGORIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewCategory = (categoryName, colour) => async (dispatch) => {
  try {
    const config = getHeadersConfig();
    const body = {
      title: categoryName,
      colour: colour,
    };

    const response = await axios.post("dishes/create-category", body, config);
    if (response.status === 200) {
      alert("Create category status: OK");
      dispatch(listCategories());
    }
  } catch (error) {
    handleRequestError(error);
  }
};

export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    const config = getHeadersConfig();
    const response = await axios.delete(
      `dishes/delete-category/${categoryId}`,
      config
    );
    if (response.status === 200) {
      alert("Remove category status: OK");
      dispatch(listCategories());
    }
  } catch (error) {
    handleRequestError(error);
  }
};
