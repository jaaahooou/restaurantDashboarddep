import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { listDishes } from '../../../../actions/dishActions';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';
import { listCategories } from '../../../../actions/categoriesActions';
const CategoriesList = () => {
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categoriesError, categoriesLoading, categories } = categoriesList;
  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;
  // console.log(dishes);
  // console.log(categoriesList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listDishes());
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDishId, setSelectedDishId] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleDishEditClick = (dishId) => {
    setSelectedDishId(dishId);
  };
  const handleCategoryEditClick = (dishId) => {
    setSelectedDishId(dishId);
  };

  return (
    // <div className="flex flex-col md:flex-row">
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_270px)]  md:p-[30px] md:left-[270px] md:top-0;">
        <h1 className="font-bold text-3xl py-1 border-b border-[#cbd5e1] mt-4">
          Menu
        </h1>
        <div className="flex justify-between px-1"></div>
        <header className="font-bold py-1 border-b border-[#cbd5e1] mt-4">
          Categories
        </header>
        <section className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-4 ">
            <span className="text-sm font-bold border-b border-[#cbd5e1] pl-2">
              Name
            </span>
            <span className="text-sm font-bold border-b border-[#cbd5e1] pl-2">
              Color
            </span>
          </div>
          {/* <button className="flex flex-col w-full">
            <div className="flex justify-between px-2 bg-[#e5e7eb] py-2 border-b border-white">
              <p className="uppercase text-sm text-[#0369a1]">Coffee</p>
              <FiMoreHorizontal />
            </div>
          </button> */}
          {categoriesList.categories.map((categoryItem) => {
            const categoryEditing = categoryItem.id === selectedDishId;
            return (
              <div key={categoryItem.id} className="flex flex-col w-full gap-2">
                {/* <div className="flex justify-between px-2 bg-[#e5e7eb] py-2 border-b border-white"> */}
                <div className="grid grid-cols-4 items-center  px-2 bg-[#e5e7eb] py-2 border-b border-white">
                  <p className="uppercase text-sm text-[#0369a1] font-bold">
                    {categoryItem.title}
                  </p>
                  <span
                    className=" w-6 h-6 grow flex"
                    style={{ backgroundColor: categoryItem.colour }}
                  ></span>
                  <button
                    onClick={() => handleCategoryEditClick(categoryItem.id)}
                    className="flex justify-center items-center w-8 h-8 text-[#0369a1] text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setOverlay(true);
                    }}
                    className="flex justify-center items-center  place-self-end text-[#ef4444] text-xs  shadowed px-2 py-1"
                  >
                    {/* <RiDeleteBin6Line className="text-[#ef4444] text-lg" /> */}
                    Remove
                  </button>
                </div>
                {categoryEditing && (
                  <div className="grid grid-cols-3  p-2 border border-[#e5e7eb] rounded">
                    <input
                      className="border uppercase border-[#cbd5e1] text-sm pl-1"
                      type="text"
                      placeholder={categoryItem.title}
                    />
                    <div className="relative place-self-center">
                      <button
                        className=" cursor-pointer w-6 h-6 grow flex place-self-center"
                        key={categoryItem.id}
                        style={{
                          backgroundColor:
                            selectedColor === ''
                              ? categoryItem.colour
                              : selectedColor,
                        }}
                        onClick={() => {
                          handleColorClick(categoryItem.colour);
                          setOpenColorPicker(!openColorPicker);
                        }}
                      ></button>
                      {openColorPicker && (
                        <div className=" grid grid-cols-3 grid-flow-row gap-1 absolute top-0 left-10 border bg-white border-[#cbd5e1] p-1 w-24">
                          {categories.map((category) => (
                            <button
                              className=" cursor-pointer w-6 h-6 grow flex"
                              key={category.id}
                              style={{ backgroundColor: category.colour }}
                              onClick={() => {
                                handleColorClick(category.colour);
                                setOpenColorPicker(false);
                              }}
                            ></button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="border border-[#cbd5e1]  py-1 px-3 text-sm  text-[#0369a1] font-bold place-self-end self-center">
                      Confirm
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1">
                  <div className="grid grid-cols-4 border  bg-[#e5e7eb] py-1">
                    <span className="font-bold pl-2 text-sm">Name</span>
                    <span className="font-bold text-sm">Price</span>
                  </div>
                  {dishes
                    .filter((dish) => dish.category == categoryItem.id)
                    .map((filteredDish, index) => {
                      const dishEditing = filteredDish.id === selectedDishId;

                      return (
                        <div
                          key={filteredDish.id}
                          className="grid grid-cols-4 items-center  text-sm "
                          style={{
                            backgroundColor:
                              index % 2 === 1 ? '#e5e7eb' : 'white',
                          }}
                        >
                          <span className="pl-2 text-[#0369a1] cursor-pointer">
                            {filteredDish.title}
                          </span>
                          <span className="text-[#0369a1] cursor-pointer">
                            {filteredDish.price}
                          </span>
                          <button
                            onClick={() => handleDishEditClick(filteredDish.id)}
                            className="flex justify-center items-center w-8 h-8 text-[#0369a1]"
                          >
                            Edit
                          </button>
                          <button
                            // onClick={() => {
                            //   setModalOpen(true);
                            //   setOverlay(true);
                            // }}
                            className="flex items-center justify-center place-self-end self-center text-[#ef4444] text-xs    shadowed px-2 py-1"
                          >
                            {/* <RiDeleteBin6Line className="text-[#ef4444] text-lg" /> */}
                            Remove
                          </button>

                          {dishEditing && (
                            <div className="col-start-1 col-end-5 flex gap-2 w-full mt-2 p-2 bg-gray-200">
                              <input
                                className="bg-[#e0f2fe] rounded p-1"
                                type="text"
                                placeholder={filteredDish.title}
                              />
                              <input
                                className="bg-[#e0f2fe]  rounded p-1"
                                type="text"
                                placeholder={filteredDish.price}
                              />

                              <button
                                className="border border-[#cbd5e1]  py-1 px-3 text-sm  text-[#0369a1] bg-white font-bold"
                                onClick={() => setSelectedDishId(null)}
                              >
                                Confirm
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                <button className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold">
                  + Add
                </button>
              </div>
            );
          })}
        </section>
      </main>
      {modalOpen && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          {/* <ModalAddEmployee
                closeModal={() => setModalOpen(false)}
                closeOverlay={() => setOverlay(false)}
              /> */}
          <main className="bg-white p-4 max-w-[400px] w-full">
            <b className="">Do you want to delete room and all items inside?</b>
            <div className="flex justify-between gap-2">
              {' '}
              <button
                onClick={() => {
                  setModalOpen(false);
                  setOverlay(false);
                }}
                className="border border-[#b91c1c] text-[#b91c1c] py-1 px-3 text-sm my-2  font-bold"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
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
      {overlay && (
        <div className="absolute z-10 top-0 bottom-0 left-0 right-0 bg-[#000] opacity-40"></div>
      )}
    </div>
  );
};

export default CategoriesList;
