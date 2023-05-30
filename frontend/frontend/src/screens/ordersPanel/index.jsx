import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

import { listOrderDishes } from "../../actions/dishActions";
import { listDishes } from "../../actions/dishActions";
import {
  getOrderDetails,
  changeDishQty,
  addToOrder,
  removeFromOrder,
  deleteFromOrder,
  increaseDishQty,
} from "../../actions/ordersActions";
import { listCategories } from "../../actions/categoriesActions";

import NavbarOrders from "../../components/navbars/NavbarOrders";

const OrdersPanel = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log("START");

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
  const [dishToChange, setdishToChange] = useState("-");
  const [dishNameToDisplay, setDishNameToDisplay] = useState("-");
  const [dishQty, setDishQty] = useState(0);
  //set first state of clicked dish in order - in case of cancel changes
  const [oldDishQty, setOldDishQty] = useState(0);
  // First states of SECTION:  Change order QTY ==  END ==

  const [reload, setReload] = useState(false);
  console.log(reload);

  //First state of active category
  const [activeCategory, setActiveCategory] = useState(0);

  // Setting states of dish to display in SECTION:  Change order QTY
  const setDishToDisplay = (filteredDish) => {
    const dishToDisplay = dishList.dishes.filter(
      (dishToDisplay) => dishToDisplay.id == filteredDish.dish
    );

    setDishNameToDisplay(dishToDisplay);
    setdishToChange(filteredDish);
    setDishQty(filteredDish.qty);
    setOldDishQty(filteredDish.qty);
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
    dispatch(changeDishQty(dishToChange, dishQty));
    setReload(!reload);
  };

  const handleClick = (event) => {
    console.log(event.detail);
    switch (event.detail) {
      case "single_click": {
        console.log("single click");
        break;
      }
      case "double_click": {
        console.log("double click");
        break;
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (reload == false) {
      console.log("USE EFF");
      dispatch(listDishes());
      dispatch(listCategories());

      dispatch(getOrderDetails(id));
    }
  }, [dispatch, reload]);

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <>
      <NavbarOrders />
      <main className="grid bg-secondary-bg-color border">
        <div className="md:min-w-[800px] md:max-w-[50vw] md:place-self-center  md:border-x-2">
          <section className="flex justify-between bg-gray-light text-secondary-gray text-sm font-semibold border-b px-2 py-1 md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
            <div className="flex gap-2">
              <span>#66</span> <span>Table 6</span>
            </div>
            <p>Name of waiter</p>
          </section>
          <section className="grid grid-cols-5 border-b-2 border-gray-light py-1 md:min-w-[800px] md:max-w-[50vw] md:place-self-center bg-white ">
            {/* <section className="flex justify-between px-2 text-sm font-bold border-b-2 border-gray-light py-1"> */}
            <span className="col-start-1 col-end-3 font-bold pl-2">Name</span>
            {/* <span className="w-half col-start-1 col-end-3 ">Name</span> */}

            <span className="text-center font-bold">QTY</span>
            <span className="text-center font-bold">EACH</span>
            <span className="text-center font-bold">TOTAL</span>
          </section>
          {/* // ============= SECTION: Display ordered dishes ================ */}
          {orderDishes ? (
            <section className="grid grid-cols-1 grid-flow-row gap-1 auto-rows-max justify-between min-h-[300px] text-sm font-bold border-b-2 border-gray-light py-1 md:min-w-[800px] md:max-w-[50vw] md:place-self-center bg-white ">
              {orderDishes.map((filteredDish) => (
                <div
                  key={filteredDish.id}
                  className=" grid grid-cols-5 "
                  // className=" flex justify-between items-center w-full bg-secondary-bg-color border  px-2"
                  onClick={() => {

                    setReload(true);

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

          <section className="flex justify-center py-2 bg-gray-light gap-2 border-b md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
            <button className="w-[90px] bg-primary-gray font-bold border-b py-1">
              Tab
            </button>
            <button className="w-[90px] bg-primary-gray font-bold border-b py-1">
              Item +
            </button>
            <button className="w-[90px] bg-primary-gray font-bold border-b py-1">
              Split
            </button>
          </section>

          <section className="flex flex-wrap justify-between items-center gap-2 px-1 py-2 border-b bg-secondary-bg-color md:min-w-[800px] md:max-w-[50vw] md:place-self-center border-x-1">
            <div className="flex gap-2">
              <button
                className="w-[25px] font-bold bg-primary-gray border-b-2"
                onClick={() => {
                  decrementDishQty();
                }}
              >
                -
              </button>
              {/* // ============= SECTION: Display QTY of selected dish ================ */}

              <button
                className="w-[25px] font-bold bg-primary-gray border-b-2"
                type=""
              >
                {dishQty}
              </button>

              {/* // ============= END SECTION: Display QTY of selected dish ================ */}

              <button
                className="w-[25px] font-bold bg-primary-gray border-b-2"
                onClick={() => {
                  incrementDishQty();
                }}
              >
                +
              </button>
            </div>
            <span className="text-xs font-bold">
              {dishNameToDisplay[0].title ? (
                <div>{dishNameToDisplay[0].title}</div>
              ) : (
                <div>dish name</div>
              )}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDishQty(oldDishQty);
                }}
                className="font-bold text-base bg-primary-gray p-1 rounded border "
              >
                Cancel
              </button>
              <button
                className="font-bold text-base bg-primary-bg-color text-white p-1 rounded border"
                onClick={() => {
                  console.log(dishNameToDisplay[0]);
                  sendDishQty();
                }}
              >
                Done
              </button>
            </div>
          </section>
          <section className="flex justify-between bg-white p-2 border-b md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
            <div className="flex flex-wrap justify-between items-center font-bold gap-4">
              <span className="text-base">Balance Due:</span>
              <span className="text-3xl text-red-300">
                ${orderDetails.order.totalPrice}
              </span>
            </div>
            <div className="flex flex-wrap  justify-between items-center font-bold gap-4">
              <span>Total: </span>
              <span className="text-3xl">${orderDetails.order.totalPrice}</span>
            </div>
          </section>

          <section className="grid grid-cols-3 grid-flow-row px-2 py-4 bg-secondary-bg-color gap-2 border-b md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
            {/* // ============= SECTION: Display Categories ================ */}

            {categories.map((category) => (
              <button
                key={category.id}
                className="uppercase text-sm font-bold text-center min-w-[80px] h-[60px] border rounded bg-white text-ellipsis whitespace-nowrap overflow-hidden px-2 hover:opacity-70"
                onClick={() => {
                  setActiveCategory(category.id);
                }}
              >
                {category.title}
              </button>
            ))}

            {/* // ============= END SECTION: Display Categories ================ */}
          </section>

          <section className="grid grid-cols-3 grid-flow-row px-2 py-4 bg-secondary-bg-color gap-2 border-b md:min-w-[800px] md:max-w-[50vw] md:place-self-center">
            {/* // ============= SECTION: Display Dish From active Category ================ */}
            {dishList.dishes
              .filter(
                (filteredDishes) => filteredDishes.category == activeCategory
              )
              .map((dishToDisplay) => (
                <button
                  onClick={() => {
                    setReload(!reload);
                    // set doubledDish - if order contains clicked dish
                    const doubledDish = orderDishes.filter(
                      (dishToCheck) => dishToCheck.dish == dishToDisplay.id
                    );
                    // if clicked dish exist in order, change qty +1
                    if (doubledDish.length > 0) {
                      let doubledDishQty = doubledDish[0].qty + 1;
                      dispatch(changeDishQty(doubledDish[0], doubledDishQty));
                      // if doesn`t - add dish to order (and also to database)
                    } else if (doubledDish.length == 0) {
                      dispatch(addToOrder(dishToDisplay, id));
                    }
                  }}
                  key={dishToDisplay.id}
                  className="uppercase text-sm font-bold text-center min-w-[80px] h-[60px] border rounded bg-white text-ellipsis whitespace-nowrap overflow-hidden px-2 hover:opacity-70"
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

export default OrdersPanel;
