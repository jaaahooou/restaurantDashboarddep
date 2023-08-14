import axios from "axios";
import {
  TABLES_LIST_REQUEST,
  TABLES_LIST_SUCCESS,
  TABLES_LIST_FAIL,
  ROOMS_LIST_REQUEST,
  ROOMS_LIST_SUCCESS,
  ROOMS_LIST_FAIL,
  CREATE_NEW_TABLE,
  CREATE_NEW_TABLE_FAIL,
  REMOVE_TABLE_FAIL,
  REMOVE_TABLE,
} from "../constants/tablesConstants";

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

export const listTables = () => async (dispatch) => {
  try {
    dispatch({ type: TABLES_LIST_REQUEST });
    const config = getAuthConfig();
    const { data } = await axios.get("/orders/get-tables", config);
    dispatch({ type: TABLES_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, TABLES_LIST_FAIL);
  }
};

export const listRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ROOMS_LIST_REQUEST });
    const config = getAuthConfig();
    const { data } = await axios.get("/orders/get-rooms", config);
    dispatch({ type: ROOMS_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(error, dispatch, ROOMS_LIST_FAIL);
  }
};

export const createNewTable =
  (room, numberOfPersons, tables, rooms) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_NEW_TABLE });

      const roomObject = rooms.find(
        (filteredRoom) => filteredRoom.name === room
      );

      const tableArray = tables.filter(
        (filteredTable) => filteredTable.room === roomObject.id
      );

      const tableData = {
        room: roomObject,
        tableNumber: tableArray.length,
        numberOfPersons: numberOfPersons,
        isOccupied: false,
      };
      dispatch({ type: CREATE_NEW_TABLE, payload: { tableData, tables } });

      const body = {
        tableData: tableData,
      };
      const config = getAuthConfig();
      const response = await axios.post(
        "orders/create-new-table",
        body,
        config
      );

      if (response.status === 200) {
        alert("Create Table status: OK");
        dispatch(listTables());
      } else if (response.status === 403) {
        alert("You don't have permission to do that");
      } else {
        alert("Something went wrong, status code: " + response.status);
      }
    } catch (error) {
      handleError(error, dispatch, CREATE_NEW_TABLE_FAIL);
    }
  };

export const removeTable = (id) => async (dispatch) => {
  try {
    const config = getAuthConfig();
    const response = await axios.delete(`orders/remove-table/${id}`, config);

    if (response.status === 200) {
      alert("Table removed");
      dispatch(listTables());
    } else if (response.status === 403) {
      alert("You don't have permission to do that");
    } else {
      alert("Something went wrong, status code: " + response.status);
    }
  } catch (error) {
    handleError(error, dispatch, REMOVE_TABLE_FAIL);
  }
};
