import axios from "axios";
import {
  // Action constants
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  USER_CREATE_FAIL,
  USER_CREATE,
  POSITIONS_LIST_FAIL,
  POSITIONS_LIST_SUCCESS,
  POSITIONS_LIST_REQUEST,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
} from "../constants/userConstants";

const API_BASE_URL = "/user";

// Function to get user info and config
const getConfig = () => {
  let userInfo = JSON.parse(localStorage.userInfo);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + String(userInfo.access),
    },
  };
  return config;
};

// Action creator: User login
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // API call to login
    const { data } = await axios.post(`${API_BASE_URL}/login/`, {
      username: username,
      password: password,
    });

    // Dispatch success action and save user info in local storage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // Dispatch failure action on login error
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action creator: Create new user
export const createNewUser =
  (name, email, position, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_CREATE,
        payload: {
          name,
          email,
          position,
          password,
        },
      });

      // API call to create a new user
      await axios.post(`${API_BASE_URL}/create/`, {
        name: name,
        email: email,
        position: position,
        password: password,
      });
    } catch (error) {
      // Dispatch failure action on user creation error
      dispatch({
        type: USER_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Action creator: Get list of users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // API call to get list of users
    const { data } = await axios.get(`${API_BASE_URL}/users/`, getConfig());

    // Dispatch success action with user data
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action on error getting users list
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action creator: Get list of employees
export const getEmployees = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LIST_REQUEST,
    });

    // API call to get list of employees
    const { data } = await axios.get(`${API_BASE_URL}/employees/`, getConfig());

    // Dispatch success action with employee data
    dispatch({
      type: EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action on error getting employees list
    dispatch({
      type: EMPLOYEE_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action creator: Get employee details by ID
export const getEmployeeById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_DETAILS_REQUEST,
    });

    // API call to get employee details by ID
    const { data } = await axios.get(
      `${API_BASE_URL}/employees/${id}`,
      getConfig()
    );

    // Dispatch success action with employee details
    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action on error getting employee details
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    console.log(error);
  }
};

// Action creator: Edit employee details
export const editEmployee =
  (id, fullName, email, phoneNumber, position) => async (dispatch) => {
    try {
      // Data sent to the backend for employee update
      const body = {
        name: fullName,
        email: email,
        phone: phoneNumber,
        position: position,
      };

      // API call to edit employee details
      await axios.put(`${API_BASE_URL}/edit-employee/${id}`, body, getConfig());

      // Display success alert
      alert("Edit Employee status: OK");
    } catch (error) {
      // Display error alert on edit failure
      alert(error);
    }
  };

// Action creator: Get list of employee positions
export const getEmployeePositions = () => async (dispatch) => {
  try {
    dispatch({
      type: POSITIONS_LIST_REQUEST,
    });

    // API call to get list of employee positions
    const { data } = await axios.get(`${API_BASE_URL}/positions/`, getConfig());

    // Dispatch success action with employee positions data
    dispatch({
      type: POSITIONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch failure action on error getting employee positions
    dispatch({
      type: POSITIONS_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action creator: Create new employee
export const createNewEmployee =
  (fullName, email, phoneNumber, position, isCashier, isDriver) =>
  async (dispatch) => {
    try {
      // Data sent to the backend for new employee creation
      const body = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        position: position,
        isCashier: isCashier,
        isDriver: isDriver,
      };

      // API call to create a new employee
      await axios.post(`${API_BASE_URL}/create-employee/`, body, getConfig());

      // Display success alert
      alert("Add Employee status: OK");
    } catch (error) {
      console.log(error);
    }
  };

// Action creator: Logout user
export const logout = () => async (dispatch) => {
  // Remove user info from local storage and dispatch logout action
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

  // Reload the window after logout for a smoother transition
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
