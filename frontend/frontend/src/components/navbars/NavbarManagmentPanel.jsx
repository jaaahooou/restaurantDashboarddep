import React, { useState } from 'react';

import { BiUserCircle } from 'react-icons/bi';
import {
  MdTableBar,
  MdOutlineKeyboardArrowDown,
  MdFastfood,
} from 'react-icons/md';

import { GiCook } from 'react-icons/gi';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
const NavbarManagmentPanel = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [logoutPanel, setLogoutPanel] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  return (
    <main className="flex flex-col ">
      <section className="flex justify-between shadow-md text-[#6b7280] relative">
        <button className="flex items-center justify-center text-center bg-primary-bg-color w-[40px]">
          <GiCook
            onClick={() => {
              navigate('/services');
            }}
            className="text-white text-2xl"
          />
        </button>
        <div
          // onClick={() => {
          //   setLogoutPanel(!logoutPanel);
          // }}
          className="flex p-2 gap-1 items-center"
        >
          <span className="flex gap-1 items-center text-sm cursor-pointer">
            <BiUserCircle className="text-2xl " />
            {userInfo.first_name}
            <button className="p-2">
              <LogoutIcon
                onClick={() => {
                  dispatch(logout());
                  navigate('/');
                }}
              />
            </button>
          </span>
          {/* <span className="p-1">
            <MdOutlineKeyboardArrowDown className="font-bold" />
          </span> */}
        </div>
        {/* {logoutPanel && (
          <button className="text-sm bg-white py-1 px-3 absolute top-8 right-3 border rounded hover:font-bold w-20 hover:bg-primary-bg-color hover:text-white">
            Logout
          </button>
        )} */}
      </section>
      <section className="flex md:hidden w-screen justify-around text-xl  shadow-md text-[#6b7280]">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-4 flex flex-col items-center bg-secondary-bg-color'
              : 'py-2 px-4 flex flex-col items-center'
          }
        >
          <MdFastfood />
          <span className="text-xs">Products</span>
        </NavLink>

        <NavLink
          to="/employess"
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-4 flex flex-col items-center bg-secondary-bg-color'
              : 'py-2 px-4 flex flex-col items-center'
          }
        >
          <GiCook />
          <span className="text-xs">Employess</span>
        </NavLink>

        <NavLink
          to="/tablesList"
          className={({ isActive }) =>
            isActive
              ? 'py-2 px-4 flex flex-col items-center bg-secondary-bg-color'
              : 'py-2 px-4 flex flex-col items-center'
          }
        >
          <MdTableBar />
          <span className="text-xs">Tables</span>
        </NavLink>
      </section>
    </main>
  );
};

export default NavbarManagmentPanel;
