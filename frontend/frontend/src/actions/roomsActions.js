import axios from "axios";
import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  REMOVE_ROOM_FAIL,
} from "../constants/roomsConstants";
import { listRooms } from "./tablesActions";

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

export const createRoom = (roomName, rooms) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });

    const body = {
      roomName: roomName,
    };
    const config = getAuthConfig();

    const response = await axios.post("/rooms/create-room", body, config);

    if (response.status === 200) {
      alert("Room added");
      dispatch(listRooms());
    } else if (response.status === 403) {
      alert("You don't have permission to do that");
    } else {
      alert("Something went wrong, response status: " + response.status);
    }

    dispatch({
      type: CREATE_ROOM_SUCCESS,
      payload: { data: response.data, rooms },
    });
  } catch (error) {
    handleError(error, dispatch, CREATE_ROOM_FAIL);
  }
};

export const removeRoom = (id) => async (dispatch) => {
  try {
    const config = getAuthConfig();

    const response = await axios.delete(`rooms/remove-room/${id}`, config);

    if (response.status === 200) {
      alert("Room removed");
      dispatch(listRooms());
    } else if (response.status === 403) {
      alert("You don't have permission to do that");
    } else {
      alert("Something went wrong, status code: " + response.status);
    }
  } catch (error) {
    handleError(error, dispatch, REMOVE_ROOM_FAIL);
  }
};
