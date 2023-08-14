import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import NavbarTop from '../../components/navbars/NavbarTop';
import { listActiveOrderDishes, listDishes } from '../../actions/dishActions';
import { listOrders } from '../../actions/ordersActions';
import { getUsers } from '../../actions/userActions';
import { setActiveDishAsInactive } from '../../actions/dishActions';
import { listRooms } from '../../actions/tablesActions';
import { listTables } from '../../actions/tablesActions';

const PendingOrders = () => {
  let dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const orderActiveDishes = useSelector((state) => state.orderActiveDishes);
  const {
    error: errorActiveDishes,
    loading: loadingActiveDishes,
    activeDishes,
  } = orderActiveDishes;

  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;

  const userList = useSelector((state) => state.userList);
  const { error: userListError, loading: userListLoading, users } = userList;

  const roomsList = useSelector((state) => state.roomsList);
  const { error: roomsListError, loading: roomsListLoading, rooms } = roomsList;

  const tableList = useSelector((state) => state.tableList);
  const {
    error: tableListError,
    loading: tableListLoading,
    tables,
  } = tableList;

  const [selectedButton, setSelectedButton] = useState('all');

  const [selectedActiveDishId, setSelectedActiveDishId] = useState('');
  let activeDishSetAsReady;
  useEffect(() => {
    dispatch(listOrders());
    dispatch(listActiveOrderDishes());
    dispatch(listDishes());
    dispatch(getUsers());
    dispatch(listRooms());
    dispatch(listTables());
  }, []);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <main>
      <NavbarTop />
      <div className="flex flex-col justify-center items-center mb-4 relative w-[calc(100%_-_50px)]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 max-w-[1600px]">
          {orders ? (
            <>
              {orders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="flex flex-col max-w-[300px] self-start mt-4 rounded-b-lg bg-[none]"
                  >
                    {/* ===============HEADER ==================== */}
                    <div className="flex flex-col gap-2 justify-between font-bold border border-[#d1d5db] ">
                      <div className="flex  w-full justify-between p-1 shadow">
                        <span className="text-sm    underline">
                          Created at: {order.createdAt.slice(11, 16)}
                        </span>
                        {/* ============= DISPLAY USER NAME ============== */}
                        <div className="flex ">
                          {users ? (
                            <div>
                              {users
                                .filter(
                                  (filteredUser) =>
                                    filteredUser.id == order.user
                                )
                                .map((userToDisplay) => (
                                  <span className={`text-xs `}>
                                    {userToDisplay.name}
                                  </span>
                                ))}
                            </div>
                          ) : (
                            <CircularProgress color="secondary" />
                          )}
                        </div>
                        {/* ============= DISPLAY USER NAME ==== END ========== */}
                      </div>
                      <div className="flex justify-between gap-2 shadow py-2 px-1 items-center">
                        <span className="text-sm bg-primary-bg-color text-white p-1 rounded-sm">
                          {order.roomName}
                        </span>
                        {/* ============= DISPLAY TABLE NUMBER============== */}
                        {tables ? (
                          <div>
                            {tables
                              .filter((table) => table.id == order.table)
                              .map((tableToDisplay) => (
                                <span className="text-xl p-2 text-white bg-primary-bg-color rounded">
                                  {/* #{tableToDisplay.tableNumber} */}#22
                                </span>
                              ))}
                          </div>
                        ) : (
                          <CircularProgress color="secondary" />
                        )}
                      </div>
                      {/* ============= DISPLAY TABLE NUMBER==== END========== */}
                    </div>

                    {/* =============== HEADER ========== END========== */}

                    <div className="flex flex-col ">
                      <div className="flex flex-col  gap-1">
                        {activeDishes ? (
                          <div>
                            {/* ============= DISPLAY ACTIVE DISH DETAILS ============= */}
                            {activeDishes
                              .filter(
                                (dishToDisplay) =>
                                  dishToDisplay.order == order.id //find dish in restaurant to get price
                              )
                              .map(
                                (
                                  item // get all active dishes
                                ) => {
                                  return (
                                    <div
                                      key={item.id}
                                      className={`flex flex-col p-2 gap-2 border-b-2 mb-1 border-[#d1d5db] rounded-b-lg last:border-b-0 last:rounded-b-lg last:shadow-lg text-[#4b5563] cursor-pointer bg-[#d1fae5]`}
                                    >
                                      <div
                                        className="flex items-center justify-between gap-2"
                                        onClick={() => {
                                          setSelectedActiveDishId(item.id);
                                        }}
                                      >
                                        <div className="flex  gap-2 ">
                                          <span className=" p-2  font-bold bg-white  rounded shadow">{`x${item.qty}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <div className="font-bold text-sm text-right">
                                            {' '}
                                            {dishes ? (
                                              <div>
                                                {dishList.dishes
                                                  .filter(
                                                    (dishToDisplay) =>
                                                      dishToDisplay.id ==
                                                      item.dish //find dish in restaurant to get price
                                                  )
                                                  .map(
                                                    (filteredDishToDisplay) => {
                                                      activeDishSetAsReady =
                                                        item.id ===
                                                        selectedActiveDishId;
                                                      return (
                                                        <div
                                                          key={
                                                            filteredDishToDisplay.id
                                                          }
                                                        >
                                                          {' '}
                                                          <div>
                                                            {' '}
                                                            {
                                                              filteredDishToDisplay.title
                                                            }
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                              </div>
                                            ) : (
                                              <CircularProgress color="secondary" />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      {/* ============= DISPLAY ACTIVE DISH DETAILS ==== END ========= */}

                                      {/* =========== Buttons - Ready to go / Close ============== */}
                                      {activeDishSetAsReady && (
                                        <div className="flex flex-col gap-2">
                                          {' '}
                                          <button
                                            className="font-bold text-sm text-center border border-primary-bg-color  rounded py-2"
                                            style={{ backgroundColor: 'white' }}
                                            onClick={() => {
                                              setSelectedActiveDishId(null);
                                            }}
                                          >
                                            Not Ready
                                          </button>
                                          <button
                                            className="font-bold text-sm text-center text-white shadow rounded py-2"
                                            style={{
                                              backgroundColor: '#296F63',
                                            }}
                                            onClick={() => {
                                              dispatch(
                                                setActiveDishAsInactive(
                                                  selectedActiveDishId
                                                )
                                              );
                                            }}
                                          >
                                            Ready to go!
                                          </button>
                                        </div>
                                      )}

                                      {/* ===========  Buttons - Ready to go / Close ==============  ====== END */}
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        ) : (
                          <CircularProgress color="secondary" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </div>
      </div>
    </main>
  );
};
export default PendingOrders;
