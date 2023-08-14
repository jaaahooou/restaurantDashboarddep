import React from "react";
import NavbarTop from "../../components/navbars/NavbarTop";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { listRooms } from "../../actions/tablesActions";
import { listTables } from "../../actions/tablesActions";
import { listActiveOrderDishes } from "../../actions/dishActions";
import { listOrders } from "../../actions/ordersActions";

const Services = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    // WADOMOŚĆ  GDY HASŁO NIE PASUJE (LUB LOGIN)
    <div>Ups! Password and login doesn`t match!</div>
  ) : (
    <main className=" flex flex-col items-center bg-secondary-bg-color h-screen">
      <NavbarTop />
      {userInfo.id ? (
        <div className="">
          <div className=" mx-6 my-8 grid max-w-[800px]">
            <div className="text-xl text-center text-white bg-[#629D93] p-1">
              <h1>Mode</h1>
            </div>
            <div className="grid grid-cols-2  gap-1">
              <button
                onClick={() => {
                  dispatch(listTables());
                  dispatch(listRooms());
                  dispatch(listOrders());
                  navigate("/tablesPanel");
                }}
                className="flex p-8 justify-center items-center  bg-white text-center font-bold text-xl"
              >
                Table Service
              </button>
              <button
                onClick={() => {
                  dispatch(listActiveOrderDishes());
                  navigate("/pending-orders");
                }}
                className="flex justify-center items-center  bg-white text-center font-bold text-xl"
              >
                Pending orders
              </button>
            </div>
          </div>
          <div className=" mx-6 my-8 grid max-w-[800px]">
            <div className="text-xl text-center text-white bg-[#629D93] p-1">
              <h1>Manager Activities</h1>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <button
                className="flex p-8 justify-center items-center  bg-white text-center font-bold text-xl"
                onClick={() => {
                  navigate("/menu");
                }}
              >
                Menu Managment
              </button>
              <button
                onClick={() => {
                  navigate("/employess");
                }}
                className="flex justify-center items-center  bg-white text-center font-bold text-xl"
              >
                Employees Managment
              </button>

              <button
                className="flex justify-center items-center  bg-white text-center font-bold text-xl"
                onClick={() => {
                  navigate("/tablesList");
                  dispatch(listRooms());
                  dispatch(listTables());
                }}
              >
                Rooms Managment
              </button>
            </div>
          </div>
        </div>
      ) : (
        // WADOMOŚĆ  GDY UŻYTKOWNIK NIE JEST ZALOGOWANY
        <div>You must be logged in</div>
      )}
    </main>
  );
};

export default Services;
