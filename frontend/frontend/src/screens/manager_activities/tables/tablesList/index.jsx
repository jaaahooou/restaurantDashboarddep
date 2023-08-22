import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';
import CircularProgress from '@mui/material/CircularProgress';

import {
  createNewTable,
  removeTable,
  listTables,
  listRooms,
} from '../../../../actions/tablesActions';
import { createRoom, removeRoom } from '../../../../actions/roomsActions';

import { FaRegTrashAlt } from 'react-icons/fa';
import ClearIcon from '@mui/icons-material/Clear';
import { CgLayoutGrid } from 'react-icons/cg';
import RoomListItem from './RoomListItem';
import RoomRemovalModal from './RoomRemovalModal';
import TableRemovalModal from './TableRemovalModal';

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
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // WHO KNOWS WHAT IS THIS??
  const [roomRemoval, setRoomRemoval] = useState(false);
  const [tableRemoval, setTableRemoval] = useState(false);
  const [overlay, setOverlay] = useState(false);

  console.log(roomRemoval);
  const handleTableSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewTable(activeRoom, numberOfGuests, tables, rooms));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTables());
    dispatch(listRooms());
  }, []);

  const handleAddRoomButtonClick = () => {
    setAddRoomIsActive(!addRoomIsActive);
    if (addRoomIsActive) {
      if (newRoomName !== '') {
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
  };

  const handleRoomRemoval = (roomId) => {
    setActiveRoom(roomId);
    setRoomRemoval(true);
    setOverlay(true);
  };

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
            onClick={handleAddRoomButtonClick}
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
            rooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                tables={tables}
                activeRoom={activeRoom}
                numberOfGuests={numberOfGuests}
                newRoomName={newRoomName}
                setActiveRoom={setActiveRoom}
                setActiveTable={setActiveTable}
                setRoomRemoval={setRoomRemoval}
                setTableRemoval={setTableRemoval}
                setOverlay={setOverlay}
                handleRoomRemoval={handleRoomRemoval}
                handleTableSubmit={handleTableSubmit}
                setNumberOfGuests={setNumberOfGuests}
              />
            ))
          ) : (
            <CircularProgress color="secondary" />
          )}
        </section>
        {/* ======= SECTION - REMOVE ROOM WITH TABLES FROM DATABASE ================= */}
        {roomRemoval && (
          <RoomRemovalModal
            activeRoom={activeRoom}
            setRoomRemoval={setRoomRemoval}
            setOverlay={setOverlay}
            removeRoom={removeRoom}
          />
        )}
        {/* ===== SECTION - REMOVE ROOM WITH TABLES FROM DATABASE =============== END ========= */}
        {/* =================== REMOVE TABLE MODAL ================= */}
        {tableRemoval && (
          <TableRemovalModal
            activeTable={activeTable}
            setTableRemoval={setTableRemoval}
            setOverlay={setOverlay}
            removeTable={removeTable}
          />
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
