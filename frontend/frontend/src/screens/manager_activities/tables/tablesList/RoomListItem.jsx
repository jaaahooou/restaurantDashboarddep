import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaRegTrashAlt } from 'react-icons/fa';
import {
  createNewTable,
  removeTable,
  listTables,
  listRooms,
} from '../../../../actions/tablesActions';
const RoomListItem = ({
  room,
  tables,
  activeRoom,
  setActiveRoom,
  setActiveTable,
  setRoomRemoval,
  setTableRemoval,
  setNumberOfGuests,
  newRoomName,
  handleRoomRemoval,
  numberOfGuests,
  setOverlay,
}) => {
  const roomsList = useSelector((state) => state.roomsList);
  const tableList = useSelector((state) => state.tableList);
  // const {
  //   error: tableListError,
  //   loading: tableListLoading,
  //   tables,
  // } = tableList;
  const dispatch = useDispatch();

  const handleTableSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewTable(activeRoom, numberOfGuests, tables, rooms));
  };

  // const [activeRoom, setActiveRoom] = useState('');

  const { error, loading, rooms } = roomsList;
  // const [roomRemoval, setRoomRemoval] = useState(false);
  // const [overlay, setOverlay] = useState(false);
  // const [numberOfGuests, setNumberOfGuests] = useState(1);
  // const [roomRemoval, setRoomRemoval] = useState(false);

  return (
    <>
      {/* {rooms.map((room) => ( */}
      <div key={room.id} className="flex flex-col">
        <div className="flex justify-between px-2 py-2 border-b border-white">
          <div
            key={room.id}
            className="uppercase text-sm font-bold text-[#6b7280]"
          >
            {room.name}
          </div>
          <button
            className="text-[#6b7280] hover:text-[#dc2626] cursor-pointer text-xs font-bold hover:underline"
            type=""
            onClick={() => {
              setRoomRemoval(true);
              setOverlay(true);
              // setActiveRoom(room.id);
              handleRoomRemoval(room.id);
            }}
          >
            Delete Room
          </button>
        </div>

        <div className="grid grid-cols-3 px-2 font-bold py-2 text-sm">
          <p>Table Number</p>
          <p>Max Guests</p>
          <p className="place-self-center">Remove</p>
        </div>
        {/* Map through tables */}
        {tables
          .filter((table) => table.room === room.id)
          .map((filteredTable, index) => (
            <div
              key={filteredTable.id}
              className="grid grid-cols-3 px-2  py-2 text-sm text-[#6b7280] shadow "
              style={{
                backgroundColor: index % 2 === 1 ? 'white' : '#f1f5f9',
              }}
            >
              <p className="font-bold ">{filteredTable.tableNumber}</p>
              <p>{filteredTable.numberOfPersons}</p>
              <p
                className=" cursor-pointer place-self-center text-[#6b7280]  hover:text-[#dc2626] text-lg   px-2 py-1 font-bold hover:underline  "
                onClick={() => {
                  setTableRemoval(true);
                  setOverlay(true);
                  setActiveTable(filteredTable.id);
                }}
              >
                <FaRegTrashAlt />
              </p>
            </div>
          ))}
        <div className="flex items-center gap-2">
          {activeRoom == `${room.name}` ? (
            <>
              <form
                onSubmit={(e) => {
                  handleTableSubmit(e, rooms, tables);
                }}
                className="flex gap-2 items-center"
              >
                <label>Number of guests</label>
                <select
                  name="languages"
                  id="lang"
                  onChange={(e) => {
                    // set number of guests
                    setNumberOfGuests(e.target.value);
                  }}
                  className="p-2"
                >
                  {/* CHOOSE NUMBER OF GUESTS */}
                  {Array.apply(0, Array(9)).map(function (x, i) {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="border h-8 place-self-start border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]"
                >
                  Add
                </button>
              </form>
              {/* CANCEL BUTTON - SET ACTIVE ROOM TO '' */}
              <button
                className="border h-8 place-self-start border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]"
                onClick={() => {
                  setActiveRoom('');

                  if (newRoomName != '') {
                    console.log('add table');
                  }
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            // SET ACTIVE ROOM TO ROOM NAME
            <button
              data-key={room.name}
              className="border h-8 place-self-start border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9] shadow"
              onClick={(e) => {
                console.log(e.target.getAttribute('data-key'));

                setActiveRoom(e.target.getAttribute('data-key'));
              }}
            >
              + Add table
            </button>
          )}
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default RoomListItem;
