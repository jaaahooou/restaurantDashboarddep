import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { dishListReducer, orderDishReducer,activeOrderDishesReducer } from "./reducers/dishReducers";
import { categoriesListReducer } from "./reducers/categoriesReducers";
import {
  orderListReducer,
  orderDetailReducer,
  pastOrdersListReducer,
} from "./reducers/orderReducers";
import { listTablesReducer, listRoomsReducer } from "./reducers/tablesReducers";
import {
  userLoginReducer,
  userListReducer,
  employeeListReducer,
  employeePositionsListReducer,
  employeeByIdReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  dishList: dishListReducer,
  categoriesList: categoriesListReducer,
  orderDishList: orderDishReducer,
  tableList: listTablesReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailReducer,
  roomsList: listRoomsReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  employeeList: employeeListReducer,
  pastOrdersList: pastOrdersListReducer,
  positionsList: employeePositionsListReducer,
  employeeDetails: employeeByIdReducer,
  orderActiveDishes:activeOrderDishesReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userList: { users: [] },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
