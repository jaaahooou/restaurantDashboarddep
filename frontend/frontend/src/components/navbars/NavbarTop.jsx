import React, { useState } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiOutlineRollback } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const NavbarTop = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  const handleCloseSubMenu = () => {
    setOpenSubMenu(false);
  };

  return (
    <div className="flex justify-between items-center p-2 text-white text-sm font-bold bg-primary-bg-color border-b-2 border-white w-full">
      <Link to="/services" className="flex items-center gap-2">
        <AiOutlineRollback className="text-xl" />
        <p className="text-base text-[#ecfdf5]">Back</p>
      </Link>

      <div className="flex">
        <div className="flex p-2 gap-1 items-center cursor-pointer">
          <span className="flex gap-1 items-center text-sm">
            <BiUserCircle className="text-2xl" /> {userInfo.first_name}
          </span>
        </div>
        <button className="p-2">
          <LogoutIcon
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default NavbarTop;
