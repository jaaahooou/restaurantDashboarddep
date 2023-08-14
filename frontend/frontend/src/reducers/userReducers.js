import {
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
  POSITIONS_LIST_FAIL,
  POSITIONS_LIST_SUCCESS,
  POSITIONS_LIST_REQUEST,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const employeeListReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true };

    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, employees: action.payload };

    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const employeePositionsListReducer = (state = {}, action) => {
  switch (action.type) {
    case POSITIONS_LIST_REQUEST:
      return { loading: true };

    case POSITIONS_LIST_SUCCESS:
      return {
        loading: false,
        positions: action.payload,
      };

    case POSITIONS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const employeeByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return { loading: true };

    case EMPLOYEE_DETAILS_SUCCESS:
      return { loading: false, employee: action.payload };

    case EMPLOYEE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
