import React from 'react';
import NavbarTop from '../../components/navbars/NavbarTop';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { listRooms } from '../../actions/tablesActions';
import { listTables } from '../../actions/tablesActions';
import { listActiveOrderDishes } from '../../actions/dishActions';
import { listOrders } from '../../actions/ordersActions';
import { GoListOrdered } from 'react-icons/go';
const Services = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const buttonData = [
    {
      label: 'Menu Management',
      onClick: () => {
        navigate('/menu');
      },
    },
    {
      label: 'Employees Management',
      onClick: () => {
        navigate('/employees');
      },
    },
    {
      label: 'Rooms Management',
      onClick: () => {
        navigate('/tablesList');
        dispatch(listRooms());
        dispatch(listTables());
      },
    },
  ];

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    // WADOMOŚĆ  GDY HASŁO NIE PASUJE (LUB LOGIN)
    <div>Ups! Password and login doesn`t match!</div>
  ) : (
    <main className=" flex flex-col items-center bg-secondary-bg-color h-screen">
      <NavbarTop />
      {userInfo.id ? (
        <div className="text-[#6b7280]">
          <div className=" mx-6 my-8 grid max-w-[800px] gap-2">
            <div className="text-xl text-center text-white bg-[#629D93] p-1">
              <h1>Mode</h1>
            </div>
            <div className="grid grid-cols-2  gap-2">
              <button
                onClick={() => {
                  dispatch(listTables());
                  dispatch(listRooms());
                  dispatch(listOrders());
                  navigate('/tablesPanel');
                }}
                className="flex flex-col p-8 justify-center items-center  bg-white text-center rounded-xl shadow"
              >
                <MdOutlineTableBar className="text-6xl font-bold" /> Table
                Service
              </button>
              <button
                onClick={() => {
                  dispatch(listActiveOrderDishes());
                  navigate('/pending-orders');
                }}
                className="flex flex-col p-8 justify-center items-center  bg-white text-center  rounded shadow"
              >
                <GoListOrdered className="text-6xl font-bold" /> Pending orders
              </button>
            </div>
          </div>
          <div className=" mx-6 my-8 grid max-w-[800px] gap-2">
            <div className="text-xl text-center text-white bg-[#629D93] p-1">
              <h1>Manager Activities</h1>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              {buttonData.map((button, index) => (
                <button
                  key={index}
                  className="flex justify-center items-center bg-white text-center font-bold text-xl p-8"
                  onClick={button.onClick}
                >
                  {button.label}
                </button>
              ))}

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
