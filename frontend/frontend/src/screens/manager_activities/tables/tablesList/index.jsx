import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';
import CircularProgress from '@mui/material/CircularProgress';
import { listTables, listRooms } from '../../../../actions/tablesActions';
import { createRoom } from '../../../../actions/roomsActions';
import { createNewTable, removeTable } from '../../../../actions/tablesActions';
import { removeRoom } from '../../../../actions/roomsActions';
import { FaRegTrashAlt } from 'react-icons/fa';
import ClearIcon from '@mui/icons-material/Clear';
import { CgLayoutGrid } from 'react-icons/cg';

const TablesList = () => {
  const roomsList = useSelector((state) => state.roomsList);
  const { error, loading, rooms } = roomsList;
  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  //INITIAL STATE OF ROOM NAME
  const [newRoomName, setNewRoomName] = useState('');
  //INITIAL STATE OF EDITOR FOR ROOM ADDING
  const [addRoomIsActive, setAddRoomIsActive] = useState(false);

  //INITIAL STATE OF ACTIVE ROOM (NEEDED TO ADD TABLE, REMOVE TABLE AND REMOVE ROOM)
  const [activeRoom, setActiveRoom] = useState('');
  //INITIAL STATE OF ACTIVE TABE (NEEDED TO REMOVE TABLE)
  const [activeTable, setActiveTable] = useState('');

  //INITIAL STATE OF NUMBER OF GUESTS, NEEDED TO ADD NEW TABLE
  const [numberOfGusets, setnumberOfGusets] = useState(1);

  // WHO KNOWS WHAT IS THIS??
  const [roomRemoval, setRoomRemoval] = useState(false);
  const [tableRemoval, setTableRemoval] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const handleTableSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewTable(activeRoom, numberOfGusets, tables, rooms));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTables());
    dispatch(listRooms());
  }, []);
  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_270px)]  md:p-[30px] md:left-[270px] md:top-10">
        <header className="font-bold py-1 border-b text-2xl border-[#cbd5e1]">
          Rooms
        </header>
        {/* SECTION : ADD ROOM */}
        <div className="flex">
          {addRoomIsActive ? (
            <label>
              <input
                className="h-8 m-2 border rounded-md border-[#cbd5e1] pl-2 text-sm"
                type="text "
                placeholder="ex: Main room"
                onChange={(e) => {
                  setNewRoomName(e.target.value);
                }}
              />
            </label>
          ) : (
            <></>
          )}

          <button
            className="border h-8 place-self-start border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9] shadow"
            onClick={() => {
              setAddRoomIsActive(!addRoomIsActive);
              if (addRoomIsActive) {
                if (newRoomName != '') {
                  dispatch(createRoom(newRoomName, rooms));
                  setTimeout(() => {
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: 'smooth',
                    });
                  }, 500);
                } else {
                  setAddRoomIsActive(!addRoomIsActive);
                }
              }
            }}
          >
            {addRoomIsActive ? '+ Add' : '+ Add room'}
          </button>
        </div>
        {/* SECTION : ADD ROOM ++ END */}
        <section className="mt-4 flex flex-col gap-4">
          <header className=" font-bold border-b border-[#cbd5e1] pl-2">
            Name
          </header>
          {/*  */}
          {roomsList ? (
            <>
              {' '}
              {rooms.map((room) => (
                //  DISPLAY ROOM NAMES
                <div key={room.id} className="flex flex-col ">
                  <div className="flex justify-between px-2  py-2 border-b border-white">
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
                        setActiveRoom(room.id);
                      }}
                    >
                      Delete Room
                    </button>
                  </div>
                  {/* // DISPLAY TABLES */}
                  <div className="grid grid-cols-3 px-2 font-bold py-2   text-sm ">
                    <p>Table Number</p>
                    <p>Max Guests</p>
                    <p className="place-self-center">Remove</p>
                  </div>
                  {tables
                    .filter((table) => table.room === room.id)
                    .map((filteredTable, index) => (
                      <div
                        key={filteredTable.id}
                        className="grid grid-cols-3 px-2  py-2 text-sm text-[#6b7280] shadow "
                        style={{
                          backgroundColor:
                            index % 2 === 1 ? 'white' : '#f1f5f9',
                        }}
                      >
                        <p className="font-bold ">
                          {filteredTable.tableNumber}
                        </p>
                        <p>{filteredTable.numberOfPersons}</p>
                        <p
                          className=" cursor-pointer place-self-center text-[#6b7280]  hover:text-[#dc2626] text-lg   px-2 py-1 font-bold hover:underline  "
                          onClick={() => {
                            setActiveTable(filteredTable.id);
                            setTableRemoval(true);
                            setOverlay(true);
                          }}
                        >
                          <FaRegTrashAlt />
                        </p>
                      </div>
                    ))}
                  {/* SECTION : ADD TABLE */}
                  <div className="flex items-center gap-2">
                    {/* SHOW INPUT IF 'ADD TABLE' BUTOON WAS CLICKED */}
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
                              setnumberOfGusets(e.target.value);
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
              ))}
            </>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </section>
        {/* ======= SECTION - REMOVE ROOM WITH TABLES FROM DATABASE ================= */}
        {roomRemoval && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <main className="bg-white p-4 max-w-[400px] w-full">
              <b className="">
                Do you want to remove room and all tables inside?
              </b>
              <div className="flex justify-between gap-2">
                {' '}
                <button
                  onClick={() => {
                    setRoomRemoval(false);
                    setOverlay(false);
                    dispatch(removeRoom(activeRoom));
                  }}
                  className="border border-[#b91c1c] text-[#b91c1c] py-1 px-3 text-sm my-2  font-bold"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setRoomRemoval(false);
                    setOverlay(false);
                  }}
                  className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold"
                >
                  Cancel
                </button>
              </div>
            </main>
          </div>
        )}

        {/* ===== SECTION - REMOVE ROOM WITH TABLES FROM DATABASE =============== END ========= */}
        {/* =================== REMOVE TABLE MODAL ================= */}
        {tableRemoval && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <main className="bg-white p-4 max-w-[400px] w-full">
              <b className="">Do you want to remove this table?</b>
              <div className="flex justify-between gap-2">
                {' '}
                <button
                  onClick={() => {
                    setTableRemoval(false);
                    setOverlay(false);
                    dispatch(removeTable(activeTable));
                  }}
                  className="border border-[#b91c1c] text-[#b91c1c] py-1 px-3 text-sm my-2  font-bold"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setTableRemoval(false);
                    setOverlay(false);
                  }}
                  className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold"
                >
                  Cancel
                </button>
              </div>
            </main>
          </div>
        )}
        {/* =================== REMOVE TABLE MODAL ====== END ================= */}
      </main>
      {overlay && (
        <div className="fixed z-40 top-0 bottom-0 left-0 right-0 bg-[#000] opacity-40"></div>
      )}
    </div>
  );
};

export default TablesList;
