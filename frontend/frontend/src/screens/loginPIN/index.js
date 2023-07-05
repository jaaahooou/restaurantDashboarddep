import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBackspaceFill } from 'react-icons/bs';

const LoginPin = () => {
  const dispatch = useDispatch();
  const [PIN, setPIN] = useState('');
  console.log(PIN);
  const Number = ({ value }) => {
    const handleClick = () => {
      if (PIN.length < 4) {
        // Dodano warunek sprawdzający długość PIN
        setPIN((prevNum) => prevNum + value.toString());
      }
    };

    return (
      <button
        className="border-2 border-primary-bg-color rounded w-[80px]  text-primary-bg-color font-bold self-center hover:bg-[#e4e4e7]"
        onClick={handleClick}
      >
        {value}
      </button>
    );
  };

  const handleBackspace = () => {
    setPIN((prevNum) => prevNum.slice(0, -1));
  };

  const output = PIN || '';
  return (
    <main className=" flex flex-col  h-screen justify-center items-center">
      <div className="border flex flex-col border-white rounded bg-white p-4 shadow-lg">
        <header className="flex text-primary-bg-color justify-between border-b-2 font-bold">
          <div className="pb-1 text-lg">PIN</div>
        </header>

        {/* Output */}
        <div className="flex flex-col justify-between gap-4">
          <input
            type="password"
            value={output}
            // onChange={handleInputChange}
            maxLength={5}
            placeholder="Max 4 Digits"
            className={` col-start-1 col-end-3 text-xl text-center p-2`}
            disabled
          />
          <p className="text-[#ef4444] text-xs">
            {'Wrong PIN. If you lost your PIN contact your manager'}
          </p>

          <div className="flex flex-col text-center gap-1 items-center ">
            <div className="flex gap-2">
              <Number value={1} />
              <Number value={2} />
              <Number value={3} />
            </div>
            <div className="flex gap-2">
              <Number value={4} />
              <Number value={5} />
              <Number value={6} />
            </div>
            <div className="flex gap-2">
              <Number value={7} />
              <Number value={8} />
              <Number value={9} />
            </div>

            <Number
              value={0}
              className="col-start-2"
              style={{ gridColumnStart: 2, gridColumnEnd: 3 }}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-2 px-4 justify-center place-self-center">
            <button
              onClick={handleBackspace}
              className="rounded flex justify-center  bg-primary-bg-color text-white font-bold py-2 "
            >
              <BsFillBackspaceFill />
            </button>

            <button
              className={`rounded bg-primary-bg-color text-white font-bold py-1 px-4 
              
            `}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPin;
