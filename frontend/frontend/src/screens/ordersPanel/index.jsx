import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { listDishes } from '../../actions/dishActions';
import {
  getOrderDetails,
  changeDishQty,
  addToOrder,
  listOrders,
} from '../../actions/ordersActions';
import { listCategories } from '../../actions/categoriesActions';
import { listOrderDishes } from '../../actions/dishActions';
import { updatePaymentMethod } from '../../actions/ordersActions';

import NavbarOrders from '../../components/navbars/NavbarOrders';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrdersPanel = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, orderDetail } = orderDetails;

  const orderDishList = useSelector((state) => state.orderDishList);
  const {
    error: errorDishList,
    loading: loadingDishList,
    orderDishes,
  } = orderDishList;

  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;

  const categoriesList = useSelector((state) => state.categoriesList);

  const { categoriesError, categoriesLoading, categories } = categoriesList;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    error: userLoginError,
    loading: userLoginLoading,
    userInfo,
  } = userLogin;
  // First states of SECTION:  Change order QTY
  const [dishToChange, setdishToChange] = useState('-');
  const [dishNameToDisplay, setDishNameToDisplay] = useState('-');

  const [dishQty, setDishQty] = useState(0);

  // First states of SECTION:  Change order QTY ==  END ==

  //First state of active category and dish
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeCategoryColour, setActiveCategoryColour] = useState('white');
  const [activeDish, setActiveDish] = useState('');

  // Setting states of dish to display in SECTION:  Change order QTY
  const setDishToDisplay = (filteredDish) => {
    if (filteredDish.dish) {
      const dishToDisplayArr = dishList.dishes.filter(
        (dishToDisplay) => dishToDisplay.id == filteredDish.dish
      );
      const dishToDisplay = dishToDisplayArr[0];
      setDishNameToDisplay(dishToDisplay);
      setdishToChange(filteredDish);
      setDishQty(filteredDish.qty);
    } else {
      const dishToDisplay = filteredDish;
      setDishNameToDisplay(dishToDisplay);
      setDishQty(1);
    }
  };
  // Increment dish QTY
  const incrementDishQty = () => {
    setDishQty(dishQty + 1);
  };

  //Decrement dish QTY

  const decrementDishQty = () => {
    if (dishQty > 0) {
      setDishQty(dishQty - 1);
    } else {
      setDishQty(0);
    }
  };

  //Send chenged dish Qty to backend
  const sendDishQty = () => {
    if (dishQty > 0) {
      dispatch(changeDishQty(dishToChange, dishQty, id, dishNameToDisplay));
    } else {
      //dispatch(deleteFromOrder(dishToChange));
      dispatch(changeDishQty(dishToChange, dishQty, id, dishNameToDisplay));
    }
  };

  useEffect(() => {
    dispatch(listDishes());
    dispatch(listCategories());
    dispatch(getOrderDetails(id));
    setTimeout(() => {
      dispatch(listOrderDishes(id));
    }, 2000);
  }, [dispatch]);

  const setOrderAsPaid = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + String(userInfo.access),
      },
    };

    const body = { isPaid: true };
    const { setOrderAsPaid } = await axios.post(
      `/orders/update-order/${id}`,
      body,
      config
    );

    navigate('/services');
    //list orders after close old order
    dispatch(listOrders());
  };

  const columnHeaders = ['Name', 'QTY', 'EACH', 'TOTAL'];
  const buttons = [
    {
      label: 'Cash',
      icon: <AttachMoneyIcon />,
      backgroundColor: '#00D100',
      onClick: () => {
        dispatch(updatePaymentMethod(id, 'CASH'));
      },
    },
    {
      label: 'Card',
      icon: <CreditCardIcon />,
      backgroundColor: '#1877F2',
      onClick: () => {
        dispatch(updatePaymentMethod(id, 'CARD'));
      },
    },
    {
      label: 'Set as paid and remove',
      backgroundColor: '#00a8e8',
      onClick: () => {
        setOrderAsPaid(id);
      },
    },
  ];

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <>
      <NavbarOrders id={id} />
      <main className="grid border md:grid-cols-2 md:h-[93vh]">
        <div className="md:flex md:flex-col md:h-full border-r-2 border-secondary-gray">
          <section className="flex justify-between bg-gray-light text-secondary-gray text-sm font-semibold border-b px-2 py-1">
            <div className="flex gap-2">
              <span>Table #{orderDetails.order.table}</span>
              <span>Payment: {orderDetails.order.paymentMethod}</span>
            </div>
            <p>{userInfo.first_name}</p>
          </section>
          <section className="grid grid-cols-5 border-b-2 border-gray-light py-1 bg-[#e2e8f0]">
            {columnHeaders.map((header, index) => (
              <span
                key={index}
                className={`${
                  index === 0 ? 'col-start-1 col-end-3' : 'text-center'
                } font-bold ${index !== 0 ? 'px-2' : 'pl-2'}`}
              >
                {header}
              </span>
            ))}
          </section>
          {/* // ============= SECTION: Display ordered dishes ================ */}
          {orderDishes ? (
            <section className="grid grid-cols-1 grid-flow-row gap-1 auto-rows-max justify-between min-h-[300px] text-sm font-bold border-b-2 border-gray-light py-1  bg-white md:h-full">
              {orderDishes.map((filteredDish) => (
                <div
                  key={filteredDish.id}
                  className=" grid grid-cols-5 border-b-2 border-gray-light pb-1"
                  onClick={() => {
                    setDishToDisplay(filteredDish);
                  }}
                >
                  <span className="text-ellipsis whitespace-nowrap overflow-hidden col-start-1 col-end-3 pl-2 flex flex-wrap max-w-full">
                    {dishList.dishes
                      .filter(
                        (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                      )
                      .map((filteredDishToDisplay) => (
                        <div key={filteredDishToDisplay.id}>
                          {filteredDishToDisplay.title}
                        </div>
                      ))}
                  </span>

                  <span className="text-center">{filteredDish.qty}</span>
                  {dishList.dishes
                    .filter(
                      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                    )
                    .map((filteredDishToDisplay) => (
                      <span
                        className="text-center"
                        key={filteredDishToDisplay.id}
                      >
                        {filteredDishToDisplay.price}
                      </span>
                    ))}
                  {dishList.dishes
                    .filter(
                      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
                    )
                    .map((filteredDishToDisplay) => (
                      <span
                        className="text-center"
                        key={filteredDishToDisplay.id}
                      >
                        {(
                          filteredDishToDisplay.price * filteredDish.qty
                        ).toFixed(2)}
                      </span>
                    ))}
                </div>
              ))}
            </section>
          ) : (
            <CircularProgress color="secondary" />
          )}

          {/* // ============= END SECTION: Display ordered dishes ================ */}

          <section className="flex justify-items-stretch justify-center py-2 bg-white gap-0.5 border-b h-20 md:h-[150px]">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="w-[100px] grow font-bold py-1"
                style={{ backgroundColor: button.backgroundColor }}
                onClick={button.onClick}
              >
                {button.label}
                {button.icon}
              </button>
            ))}
          </section>
          <section className="flex justify-between bg-white p-2 border-b ">
            <div className="flex flex-wrap justify-between items-center font-bold gap-4 ">
              <span className="text-sm ">Balance Due:</span>
              <span className="text-2xl text-red-300">
                ${orderDetails.order.totalPrice}
              </span>
            </div>
            <div className="flex flex-wrap  justify-between items-center font-bold gap-4">
              <span className="text-sm">Total: </span>
              <span className="text-2xl">${orderDetails.order.totalPrice}</span>
            </div>
          </section>
        </div>
        <div className="md:flex md:flex-col ">
          <section className="flex flex-nowrap justify-between items-center gap-2 px-1 border-b h-14 border-x-1 bg-white">
            <div className="flex gap-2">
              <button
                className="h-12 w-9 font-bold border-2 rounded-sm border-black text-lg"
                onClick={() => {
                  decrementDishQty();
                }}
              >
                <RemoveIcon />
              </button>
              {/* // ============= SECTION: Display QTY of selected dish ================ */}

              <button className=" w-16 h-12 font-bold">{dishQty}</button>

              {/* // ============= END SECTION: Display QTY of selected dish ================ */}

              <button
                className="  h-12 w-9 font-bold border-2 rounded-sm border-black"
                onClick={() => {
                  incrementDishQty();
                }}
              >
                <AddIcon />
              </button>
            </div>
            <div className="flex gap-4">
              <button
                type=""
                className="uppercase shadow-xl text-sm font-bold text-center min-w-[80px] h-[40px]  text-ellipsis whitespace-nowrap overflow-hidden px-2 hover:opacity-70"
                style={{ backgroundColor: '#00a8e8' }}
                onClick={() => {
                  // dishNameToDisplay - dish from menu with 'price' table in data base
                  //dishToCHange - dish from order with 'qty' table in data base

                  //If there is no dishNameToDisplay or dishToChange, don`t do anything
                  //after "DONE" is cklicked
                  if (dishNameToDisplay != '-' || dishToChange != '-') {
                    if (dishToChange != '-') {
                      sendDishQty();
                    } else {
                      dispatch(addToOrder(dishNameToDisplay, id, dishQty));
                      setTimeout(() => {
                        dispatch(listOrderDishes(id));
                      }, 2000);
                    }
                  }
                }}
              >
                Done
              </button>
            </div>
          </section>
          <section className="py-2 bg-white">
            {' '}
            <span className="text-s font-bold text-center">
              {dishNameToDisplay.title ? (
                <div>{dishNameToDisplay.title}</div>
              ) : (
                <div>dish name</div>
              )}
            </span>
          </section>

          <section className="relative flex items-center ">
            {/* // ============= SECTION: Display Categories ================ */}
            <div className="w-screen h-full  overflow-auto whitespace-nowrap scroll-smooth py-4 md:grid md:grid-cols-4 gap-y-2 bg-white">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`uppercase text-sm w-[100px] md:w-auto inline-block mx-1  ${
                    activeCategory == category.id ? 'border-b-4' : ''
                  } shadow-lg font-bold text-center  h-[60px] text-ellipsis whitespace-nowrap  px-2 hover:opacity-70 `}
                  style={{
                    backgroundColor: `${category.colour}`,
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveCategoryColour(category.colour);
                  }}
                >
                  {category.title}
                </button>
              ))}
            </div>
            {/* // ============= END SECTION: Display Categories ================ */}
          </section>

          <section className="grid grid-cols-4 grid-flow-row px-2 py-4 bg-white gap-2  ">
            {/* // ============= SECTION: Display Dish From active Category ================ */}
            {dishList.dishes
              .filter(
                (filteredDishes) => filteredDishes.category == activeCategory
              )
              .map((dishToDisplay) => (
                <button
                  style={{
                    backgroundColor: `${activeCategoryColour}`,
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    setdishToChange('-');
                    setActiveDish(dishToDisplay);
                    setDishToDisplay(dishToDisplay);
                  }}
                  key={dishToDisplay.id}
                  className={`${
                    activeDish == dishToDisplay ? 'border-b-4' : ''
                  } uppercase shadow-xl text-sm font-bold text-center min-w-[80px] h-[60px]  text-ellipsis whitespace-nowrap overflow-hidden px-2 hover:opacity-70`}
                >
                  {dishToDisplay.title}
                </button>
              ))}

            {/* // ============= END SECTION: Display Dish From active Category ================ */}
          </section>
        </div>
      </main>
    </>
  );
};
//
export default OrdersPanel;
