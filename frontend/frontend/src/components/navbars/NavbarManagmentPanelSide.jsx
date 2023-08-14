import React from "react";
import { GiCook } from "react-icons/gi";

import { MdTableBar, MdFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { getEmployees } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const NavbarManagmentPanelSide = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <main className="hidden md:flex flex-col flex-wrap items-start fixed w-[170px] h-full text-white bg-white z-30 border-r-2 border-[#e2e8f0]">
      <div
        onClick={() => {
          navigate("/services");
        }}
        className=" flex items-center justify-center bg-primary-bg-color w-full py-2"
      >
        <GiCook className="text-white text-4xl " />
        <span className="text-xl font-bold cursor-pointer">FakePos</span>
      </div>
      <div className="flex flex-col  border-b-2 border-[#e2e8f0] w-full py-4">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive
              ? "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer bg-secondary-bg-color"
              : "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer"
          }
        >
          <Link
            to="/menu"
            className="flex items-center gap-2 text-[#6b7280] text-sm font-bold "
          >
            <MdFastfood className="text-xl" />
            Menu Management
          </Link>
        </NavLink>
        <NavLink
          to="/employess"
          onClick={() => {
            dispatch(getEmployees());
          }}
          className={({ isActive }) =>
            isActive
              ? "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer bg-secondary-bg-color"
              : "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer"
          }
        >
          <li className="flex items-center gap-2 text-[#6b7280] text-sm font-bold cursor-pointer">
            <GiCook className="text-xl" />
            Employess Management
          </li>
        </NavLink>
        <NavLink
          to="/tablesList"
          className={({ isActive }) =>
            isActive
              ? "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer bg-secondary-bg-color"
              : "flex flex-wrap gap-2 flex-col justify-around w-full overflow-hidden hover:bg-secondary-bg-color p-2 cursor-pointer"
          }
        >
          <li className="flex items-center gap-2 text-[#6b7280] text-sm font-bold cursor-pointer">
            <MdTableBar className="text-xl" />
            Rooms Management
          </li>
        </NavLink>
      </div>
    </main>
  );
};

export default NavbarManagmentPanelSide;
