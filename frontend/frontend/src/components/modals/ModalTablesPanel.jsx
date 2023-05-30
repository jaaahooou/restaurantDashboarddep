import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../actions/ordersActions";

import { BsFillBackspaceFill } from "react-icons/bs";
const ModalTablesPanel = ({
  closeModal,
  selectedMaxNumOfGuests,
  closeOverlay,

  tableId,
}) => {
  console.log(`console log z ModalTablesPanel ${selectedMaxNumOfGuests}`);
  const [numOfGuests, setNumOFGuests] = useState("");
  const dispatch = useDispatch();

  //if numOfGuests is not empty (numOfGuests !== ''), or if numOfGuests is empty and the selected value is not 0 (numOfGuests === '' && value !== 0), then the value will be appended to numOfGuests. This ensures that 0 can only be selected as the second digit, given that the first digit is not 0.

  const Number = ({ value }) => {
    const handleClick = () => {
      if (numOfGuests !== "" || (numOfGuests === "" && value !== 0)) {
        setNumOFGuests((prevNum) => prevNum + value.toString());
      }
    };
    //renders button as component
    return (
      <button
        className="border-2 border-primary-bg-color rounded w-[60px]  text-primary-bg-color font-bold self-center hover:bg-[#e4e4e7]"
        onClick={handleClick}
      >
        {value}
      </button>
    );
  };

  //changes color of text when numOfGuests is bigger than selectedMaxNumOfGuests
  const outputClassName =
    numOfGuests > selectedMaxNumOfGuests
      ? "text-center text-3xl text-[#ef4444] col-start-2 col-end-2 py-2"
      : "text-center text-3xl text-primary-bg-color col-start-2 col-end-2 py-2";

  const handleBackspace = () => {
    setNumOFGuests((prevNum) => prevNum.slice(0, -1));
  };

  //sets default value of output

  const outputValue = numOfGuests || "0";

  return (
    <main className=" flex flex-col border-white rounded bg-white p-2">
      <header className="flex text-primary-bg-color justify-between border-b-2 font-bold">
        <div className="pb-1 text-lg">Number of guests</div>
      </header>

      {/* Output */}
      <div className="grid grid-cols-2 justify-between">
        <div className={`${outputClassName} col-start-1 col-end-3`}>
          {outputValue}
        </div>
        {/* =========================== */}
        {/* <div className="grid grid-cols-3 col-span-2 text-center gap-1 items-center " > */}
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
        <div className="flex flex-col gap-2 px-4">
          <button
            onClick={handleBackspace}
            className="rounded flex justify-center text-xl bg-primary-bg-color text-white font-bold py-2 "
          >
            <BsFillBackspaceFill />
          </button>
          <button
            onClick={() => {
              closeModal(false);
              closeOverlay(false);
            }}
            className="rounded bg-primary-bg-color text-white font-bold py-1 px-4"
          >
            Cancel
          </button>
          <button
            // disabled={parseInt(numOfGuests) > selectedMaxNumOfGuests}
            // className={`rounded bg-primary-bg-color text-white font-bold py-1 px-4 ${numOfGuests > selectedMaxNumOfGuests ? 'opacity-50' : ''}`}
            className={`rounded bg-primary-bg-color text-white font-bold py-1 px-4 ${
              numOfGuests > selectedMaxNumOfGuests ? "opacity-50" : ""
            }`}

            onClick={() => {
              dispatch(createOrder(tableId));
            }}

          >
            Done
          </button>
        </div>
      </div>
    </main>
  );
};

export default ModalTablesPanel;
