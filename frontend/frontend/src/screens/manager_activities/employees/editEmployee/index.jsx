import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';
import CircularProgress from '@mui/material/CircularProgress';
import { getEmployeePositions } from '../../../../actions/userActions';
import { getEmployeeById } from '../../../../actions/userActions';
import { editEmployee } from '../../../../actions/userActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../../actions/userActions';

const EditEmployee = () => {
  let dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  // first states of Name, email and phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumError, setPhoneNumError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const [position, setPosition] = useState('');
  const [isCashier, setIsCashier] = useState('');
  const [isDriver, setIsDriver] = useState('');

  // get employees positions
  const positionsList = useSelector((state) => state.positionsList);
  const { error, loading, positions } = positionsList;

  // get employee Details
  const employeeDetails = useSelector((state) => state.employeeDetails);
  const {
    error: errorEmployeeDetails,
    loading: loadingEmployeeDetails,
    employee,
  } = employeeDetails;

  const validateFullName = (e, setInputChange) => {
    const inputValue = e.target.value;

    // Regular expression to match email format
    const fullNameRegex = /^[a-zA-Z]/;

    // Check if the input value is empty or matches the email regex
    if (inputValue === '' || fullNameRegex.test(inputValue)) {
      // Set the input text using the provided setter function
      setInputChange(inputValue);
      setFullNameError(''); // Clear the email error
    } else {
      // Set the input text using the provided setter function
      setInputChange(inputValue);
      setFullNameError('Full Name can contain only letters'); // Set the email error message
    }
  };

  const handlePhoneNumberChange = (e, setInputText) => {
    // Get the input value from the event
    const inputValue = e.target.value;

    // Regular expression to match numbers
    const numbersRegex = /^[0-9]*$/;

    // Check if the input value is empty or consists only of numbers
    if (inputValue === '' || numbersRegex.test(inputValue)) {
      // Set the input text using the provided setter function
      setInputText(inputValue);
      setPhoneNumError('');
    } else {
      setInputText(inputValue);
      setPhoneNumError('Only numbers');
    }
  };

  const validateEmail = (e, setInputChange) => {
    const inputValue = e.target.value;

    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the input value is empty or matches the email regex
    if (inputValue === '' || emailRegex.test(inputValue)) {
      // Set the input text using the provided setter function
      setInputChange(inputValue);
      setEmailError('Email format is correct'); // Clear the email error
    } else {
      // Set the input text using the provided setter function
      setInputChange(inputValue);
      setEmailError('Incorrect email format'); // Set the email error message
    }
  };

  const confirmEmployeeHandler = (e) => {
    e.preventDefault();
    dispatch(editEmployee(id, fullName, email, phoneNumber, position));
  };

  useEffect(() => {
    dispatch(getEmployeePositions());
    dispatch(getEmployeeById(id));
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_270px)]  md:p-[30px] md:left-[270px] md:top-0;">
        <section className="flex flex-col gap-3 my-4">
          <header className="font-bold py-1 border-b text-2xl border-[#cbd5e1]">
            Edit employee
          </header>
          {employee ? (
            <form className="flex flex-col gap-2">
              <div className="p-6 md:p-0 bg-gray-100 flex items-center ">
                <div className="w-full md:max-w-[800px] ">
                  <div>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-5">
                            <label className="font-bold">Full Name</label>
                            <input
                              type="text"
                              name="full_name"
                              id="full_name"
                              className="h-10 border mt-1 rounded pl-2 w-full bg-gray-50 bg-[#e0f2fe]"
                              placeholder={employee.name}
                              required
                              onChange={(e) => {
                                setFullName(e.target.value);
                                validateFullName(e, setFullName);
                              }}
                            />
                            <span className={`text-xs text-[#dc2626]`}>
                              {fullNameError || '\u00A0'}
                            </span>
                          </div>

                          <div className="md:col-span-3">
                            <div className="flex justify-between items-center">
                              <label className="font-bold ">
                                Email Address
                              </label>
                            </div>

                            <input
                              type="text"
                              name="email"
                              id="email"
                              className={`h-10 border mt-1 rounded pl-2 w-full bg-[#e0f2fe]`}
                              onChange={(e) => validateEmail(e, setEmail)}
                              value={email}
                              placeholder={
                                employee.email === null
                                  ? 'ex: example@email.com'
                                  : employee.email
                              }
                              required
                            />
                            <span
                              className={`text-xs text-[#dc2626] ${
                                emailError === 'Email format is correct'
                                  ? 'text-[#84cc16]'
                                  : ''
                              }`}
                            >
                              {emailError || '\u00A0'}
                            </span>
                          </div>

                          <div className="md:col-span-2">
                            <label className="font-bold">Phone</label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              className="h-10 border mt-1 rounded pl-2 w-full bg-[#e0f2fe]"
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);

                                handlePhoneNumberChange(e, setPhoneNumber);
                              }}
                              value={phoneNumber}
                              placeholder={
                                employee.phone === null
                                  ? 'Enter your phone number...'
                                  : employee.phone
                              }
                              required
                            />
                            <span className={`text-xs text-[#dc2626]`}>
                              {phoneNumError || '\u00A0'}
                            </span>
                          </div>

                          <div className="md:col-span-3 ">
                            <label className="font-bold">
                              Actual position : {employee.position}
                            </label>
                            {positions ? (
                              <select
                                onChange={(e) => {
                                  setPosition(e.target.value);
                                }}
                                className="w-full h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 pl-2"
                              >
                                {' '}
                                {/* <option value={employee.title}></option> */}
                                {positions.map((position, i) => (
                                  <option
                                    key={i}
                                    value={position.title}
                                    className="font-normal"
                                    // placeholder="Chosse new role"
                                  >
                                    {position.title}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <CircularProgress color="secondary" />
                            )}
                          </div>
                          <div className="md:col-span-5 text-right bg-blue-500">
                            <div className="flex justify-between">
                              <button
                                onClick={(e) => {
                                  confirmEmployeeHandler(e);
                                  dispatch(getUsers());
                                }}
                                className="flex justify-center w-20 rounded border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </section>
      </main>
    </div>
  );
};

export default EditEmployee;
