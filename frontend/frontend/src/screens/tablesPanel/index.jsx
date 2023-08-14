import React, { useEffect, useState } from "react";
import NavbarTop from "../../components/navbars/NavbarTop";
import ModalTablesPanel from "../../components/modals/ModalTablesPanel";
import { useDispatch, useSelector } from "react-redux";
import { listTables, listRooms } from "../../actions/tablesActions";
import { listOrders } from "../../actions/ordersActions";
import CircularProgress from "@mui/material/CircularProgress";
import { MdTableBar } from "react-icons/md";
import { listOrderDishes } from "../../actions/dishActions";
import { getOrderDetails } from "../../actions/ordersActions";

import { LinkContainer } from "react-router-bootstrap";

const TablesPanel = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;

  useEffect(() => {
    dispatch(listTables());
    dispatch(listRooms());
    dispatch(listOrders());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [selectedMaxNumOfGuests, setSelectedMaxNumOfGuests] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // =========== table ID used to create new order ============
  const [tableId, setTableId] = useState(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <main className="bg-secondary-bg-color h-screen relative flex flex-col  ">
      <NavbarTop />
      <h1 className="font-bold text-[#0f766e] text-3xl text-center pl-2 my-4 ml-2">
        Rooms
      </h1>

      <div className="grid grid-cols-4 grid-flow-row auto-rows-fr gap-y-4 mb-4 md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
        {rooms.map((room, index) => (
          <button
            key={room.id}
            className={`p-2 mx-2 text-base text-white bg-primary-bg-color shadow-xl  ${
              activeTab === index
                ? "text-[#f1fd47] font-bold border-2 border-white"
                : "text-[#374151] border-2 border-primary-bg-color"
            }`}
            /* Renders rooms acording to active tab state and index, also adds styling to active tab button*/
            onClick={() => handleTabChange(index)}
          >
            {room.name}
          </button>
        ))}
      </div>

      {rooms.map((room, index) => (
        <section
          key={room.id}
          className={`p-2 md:p-4 md:min-w-[800px] md:max-w-[50vw] md:place-self-center md:border-2 md:border-[#337066] md:mb-6 md:rounded md:shadow-md ${
            activeTab !== index ? "hidden" : ""
          }`}
          // if activeTab is no selected - activeTab is hidden
        >
          <header className="flex items-center text-lg font-bold text-[#374151] mb-2">
            <MdTableBar className="text-lg text-[#f1fd47] bg-primary-bg-color rounded-full p-1 w-6 h-6 mr-2 shadow" />
            {room.name}
          </header>
          <div className="grid grid-cols-4 place-content-center gap-1 gap-y-3 mb-5 bg-secondary-bg-color grid-flow-row">
            {/* TABLES RENDERING
        1. Object tables is .filter by table.room 
        2. Acquired array is .map to filteredTable
        3. If filteredTable isOccupied filteredTable has new styling sugesting his state: border: "2px dashed red"
        */}

            {tables
              .filter((table) => table.room === room.id)
              .map((filteredTable) => (
                <>
                  {filteredTable.isOccupied ? (
                    <>
                      {/* DISPLAY OCCUPIED TABLES */}
                      {orders
                        .filter((order) => order.table === filteredTable.id)
                        .map((filteredOrder) => (
                          <LinkContainer
                            key={filteredOrder.id}
                            component="button"
                            onClick={() => {
                              dispatch(listOrderDishes(filteredOrder.id));
                              dispatch(getOrderDetails(filteredOrder.id));
                            }}
                            to={`/orders/order/${filteredOrder.id}`}
                            style={{
                              border: "2px dashed red",
                            }}
                          >
                            <button
                              key={filteredTable.id}
                              // disabled
                              className="flex flex-col items-center justify-center duration-200 font-bold border-2 border-primary-bg-color rounded shadow bg-white opacity-50 cursor-not-allowed"
                            >
                              <span className="text-3xl">
                                #{filteredTable.tableNumber}
                              </span>
                              <span>1-{filteredTable.numberOfPersons}</span>
                            </button>
                          </LinkContainer>
                        ))}
                    </>
                  ) : (
                    /* PASSING PROPS TO MODAL
                  1. onClick passing param setSelectedMaxNumOfGuests(filteredTable.numberOfPersons) to ModalTablesPanel*/

                    <button
                      key={filteredTable.id}
                      className="flex flex-col items-center justify-center bg-[#f0fdfa] duration-200 font-bold border-2 hover:border-dotted border-primary-bg-color rounded shadow"
                      onClick={() => {
                        setSelectedMaxNumOfGuests(
                          filteredTable.numberOfPersons
                        );
                        setModalOpen(true);
                        setOverlay(true);
                        setTableId(filteredTable.id);
                      }}
                    >
                      <span className="text-3xl text-[#0f766e]">
                        #{filteredTable.tableNumber}
                      </span>
                      <span className="text-[#0f766e]">
                        1-{filteredTable.numberOfPersons}
                      </span>
                    </button>
                  )}
                </>
              ))}
          </div>
        </section>
      ))}

      {modalOpen && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <ModalTablesPanel
            tableId={tableId}
            selectedMaxNumOfGuests={selectedMaxNumOfGuests}
            closeModal={() => setModalOpen(false)}
            closeOverlay={() => setOverlay(false)}
          />
        </div>
      )}

      {overlay && (
        <div className="absolute z-10 top-0 bottom-0 left-0 right-0 bg-[#000] opacity-40"></div>
      )}
    </main>
  );
};

export default TablesPanel;
