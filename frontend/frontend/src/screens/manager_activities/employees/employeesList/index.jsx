import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';

import CircularProgress from '@mui/material/CircularProgress';
import { getEmployees } from '../../../../actions/userActions';

const EmployeesList = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const listEmployees = useSelector((state) => state.employeeList);
  const {
    error: listEmployeesError,
    loading: listEmployeesLoading,
    employees,
  } = listEmployees;

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_170px)]  md:p-[30px] md:left-[170px]  md:top-10">
        <header className="font-bold py-1 border-b text-2xl border-[#cbd5e1]">
          Employess
        </header>
        <Link
          to="/employess/new-employee"
          className="border flex  place-self-start border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]"
        >
          + Add employee
        </Link>
        <section className="flex flex-col mt-4">
          <div className="grid grid-cols-3 md:grid-cols-6 px-2 font-bold py-2 text-xs md:text-[0.7em] lg:text-xs text-[#a3a3a3]">
            <span>Full name</span>
            <span>Position</span>

            <span className="hidden md:flex">Cashier</span>
            <span className="hidden md:flex">Driver</span>
            <span>Phone</span>
            <span className="hidden md:flex">Email</span>
          </div>
          {employees ? (
            <div>
              {employees.map((employee) => (
                <Link
                  to={`/employess/${employee.id}`}
                  key={employee.id}
                  className="grid grid-cols-3 md:grid-cols-6 px-2  py-2 border rounded border-[#e5e7eb]  text-xs   font-bold mb-2"
                >
                  <span className="flex md:text-[0.9em] lg:text-xs">
                    {employee.name}
                  </span>
                  <span className="md:text-[0.9em] lg:text-xs">
                    {employee.position}
                  </span>

                  <span
                    className={`hidden md:flex md:text-[0.9em] lg:text-xs  text-[#f97316] rounded py-1 px-2 place-self-start ${
                      !employee.isCashier ? 'bg-white' : 'bg-[#ffedd5]'
                    }`}
                  >
                    {employee.isCashier ? 'Cashier' : ''}
                  </span>

                  <span
                    className={`hidden md:flex md:text-[0.9em] lg:text-xs  text-[#65a30d] rounded py-1 px-2 place-self-start ${
                      !employee.isDriver ? 'bg-white' : 'bg-[#ecfccb]'
                    }`}
                  >
                    {employee.isDriver ? 'Driver' : null}
                  </span>

                  <span className="flex break-all md:text-[0.9em] lg:text-xs text-[#94a3b8]">
                    {employee.phone}
                  </span>
                  <span className="  hidden md:flex md:text-[0.9em] md:break-all lg:text-xs text-[#94a3b8]">
                    {employee.email}
                  </span>
                  {/* <span className="  hidden md:flex">{employee.email}</span> */}
                </Link>
              ))}
            </div>
          ) : (
            <CircularProgress
              className="grid self-center justify-self-center w-screen "
              color="secondary"
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default EmployeesList;
