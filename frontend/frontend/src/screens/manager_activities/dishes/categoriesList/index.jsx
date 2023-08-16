import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
  listDishes,
  addDishToMenu,
  removeDishFromMenu,
  editDish,
} from '../../../../actions/dishActions';
import {
  listCategories,
  createNewCategory,
  removeCategory,
} from '../../../../actions/categoriesActions';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';

import AddCategoryForm from './components/CategoryForm';
const CategoriesList = () => {
  const categoriesList = useSelector((state) => state.categoriesList);
  const { error, loading, categories } = categoriesList;
  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listDishes());
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [overlay, setOverlay] = useState(false);

  // ADD CATEGORY - INITIAL STATE OF VARIABLES
  // const [selectedColor, setSelectedColor] = useState('#0ca3ee');
  // const [newCategoryName, setNewCategoryName] = useState('');
  const [openCategoryForm, setOpenCategoryForm] = useState(false);

  // INITIAL STATE OF CATEGORY ID
  const [categoryId, setCategoryId] = useState(null);

  // INITIAL NAME AND PRICE VALUES (ADD DISH AND EDIT)
  const [newDishName, setNewDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [categoryName, setCategoryName] = useState(null);
  const [selectedDishId, setSelectedDishId] = useState(null);

  const handleCategoryEditClick = (categoryId) => {
    setCategoryName(categoryId);
  };

  // A FUNCTION THAT ADDS A NEW DISH TO MENU
  const addNewDish = () => {
    dispatch(addDishToMenu(categoryName, newDishName, dishPrice));
  };

  const addCategoryHandler = (categoryName, selectedColor) => {
    // Dispatch an action to create a new category using the provided data
    dispatch(createNewCategory(categoryName, selectedColor));
    setOpenCategoryForm(false); // Close the category form
  };

  return loading ? (
    <CircularProgress color="secondary" />
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_270px)]   md:left-[270px] md:top-10">
        <div className="flex flex-col px-1 border-b border-[#cbd5e1] my-2">
          <h1 className="font-bold py-1 border-b border-[#cbd5e1] mt-4 text-3xl">
            Menu
          </h1>
          <Link
            className="border border-[#cbd5e1] place-self-start  py-1 px-3 text-sm my-2 mt-3 text-[#0369a1] font-bold hover:bg-[#f1f5f9] rounded shadow"
            onClick={() => {
              setOpenCategoryForm(!openCategoryForm);
            }}
          >
            + Add Category
          </Link>

          {/* =============   ADD CATEGORY FORM  ===============  */}
          {openCategoryForm ? (
            <AddCategoryForm onAddCategory={addCategoryHandler} />
          ) : (
            <></>
          )}

          {/* =============   ADD CATEGORY FORM ====== END  ===============  */}

          <header className="font-bold py-1  mt-4">Categories</header>
        </div>
        <section className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-4 ">
            <span className="text-sm font-bold  pl-2 place-self-start">
              Name
            </span>
            <span className="text-sm font-bold  pl-2 place-self-start">
              Color
            </span>
          </div>
          {categoriesList.categories.map((categoryItem) => {
            const categoryEditing = categoryItem.id === categoryName;
            return (
              <div
                key={categoryItem.id}
                className="flex flex-col w-full gap-2 "
              >
                <div className="shadow">
                  <div className="grid grid-cols-4 items-center  px-2 bg-[#f1f5f9] py-2 border-b border-white rounded shadow">
                    <p className="uppercase text-sm text-[#6b7280] font-bold">
                      {categoryItem.title}
                    </p>
                    <span
                      className=" w-6 h-6 grow flex border-2 border-white"
                      style={{ backgroundColor: categoryItem.colour }}
                    ></span>
                    <button
                      onClick={() => handleCategoryEditClick(categoryItem.id)}
                      className="flex justify-center items-center w-8 h-8 text-[#64748b] text-sm font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setOverlay(true);
                        setCategoryId(categoryItem.id);
                      }}
                      className="flex place-self-end self-center text-[#6b7280]  hover:text-[#dc2626] text-lg   px-2 py-1 font-bold hover:underline "
                    >
                      {/* Delete category */}
                      <FaRegTrashAlt />
                    </button>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="grid grid-cols-4   py-4">
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
                            className="grid grid-cols-4 items-center  text-sm text-[#6b7280] py-1"
                            style={{
                              backgroundColor:
                                index % 2 === 1 ? 'white' : '#f1f5f9',
                            }}
                          >
                            <span className="pl-2  cursor-pointer text-[0.9em] font-bold py-1">
                              {filteredDish.title}
                            </span>
                            <span className=" cursor-pointer">
                              {filteredDish.price}
                            </span>
                            <button
                              onClick={() => setSelectedDishId(filteredDish.id)}
                              className="flex justify-center items-center w-8 h-8 text-xs font-bold hover:underline "
                            >
                              Edit
                            </button>
                            <button
                              className="flex place-self-end self-center text-[#6b7280]  hover:text-[#dc2626] text-lg  px-2 py-1 font-bold hover:underline mr-2"
                              onClick={() => {
                                dispatch(
                                  removeDishFromMenu(dishes, filteredDish)
                                );
                              }}
                            >
                              <FaRegTrashAlt />
                            </button>
                            {/* ===========  EDIT DISH - editor panel ============ */}
                            {dishEditing && (
                              <div className="col-start-1 col-end-5 flex gap-2 w-full mt-2 p-2 bg-gray-200">
                                <input
                                  className="bg-[#e0f2fe] rounded p-1"
                                  type="text"
                                  placeholder={filteredDish.title}
                                  onChange={(e) => {
                                    setNewDishName(e.target.value);
                                  }}
                                />
                                <input
                                  className="bg-[#e0f2fe]  rounded p-1"
                                  type="text"
                                  placeholder={filteredDish.price}
                                  onChange={(e) => {
                                    setDishPrice(e.target.value);
                                  }}
                                />

                                <button
                                  className="border border-[#cbd5e1]  py-1 px-3 text-sm  text-[#0369a1] bg-white font-bold"
                                  onClick={() => {
                                    console.log('Edytuje');
                                    console.log();
                                    dispatch(
                                      editDish(
                                        filteredDish.id,
                                        newDishName,
                                        dishPrice
                                      )
                                    );
                                    setSelectedDishId(null);
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            )}
                            {/* ===========  EDIT DISH - editor panel == END ============ */}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAddProductModal(true);
                    setOverlay(true);
                    setCategoryName(categoryItem.title);
                    setCategoryId(categoryItem.id);
                  }}
                  className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold hover:bg-[#f1f5f9] place-self-start rounded shadow-md"
                >
                  + Add
                </button>
              </div>
            );
          })}
        </section>
        {/* ===========  REMOVE CATEGORY PANEL  ============ */}
        {modalOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <main className="bg-white p-4 max-w-[400px] w-full">
              <b className="">
                Do you want to delete room and all items inside?
              </b>
              <div className="flex justify-between gap-2">
                {' '}
                <button
                  onClick={() => {
                    dispatch(removeCategory(categoryId));
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
        )}{' '}
        {/* ===========  REMOVE CATEGORY PANEL === EMD  ============ */}
        {/* ================ ADD NEW DISH MODAL ================ */}
        {addProductModal && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <main className="bg-white p-4 max-w-[400px] w-full">
              <b className="">Adding new product to {categoryName} </b>
              <div className="flex justify-between gap-2">
                <div className="py-2 flex flex-wrap  items-center gap-2 text-sm">
                  <label
                    className="font-bold flex items-center gap-2"
                    htmlFor=""
                  >
                    Product Name:
                    <input
                      className="border border-[#cbd5e1] py-1 pl-1 font-normal"
                      type="text"
                      placeholder="ex: Scrambled eggs"
                      onChange={(e) => {
                        setNewDishName(e.target.value);
                      }}
                    />
                  </label>
                  <label
                    className="font-bold flex items-center gap-2"
                    htmlFor=""
                  >
                    Product Price:
                    <input
                      className="border border-[#cbd5e1] py-1 pl-1 font-normal place-self"
                      type="text"
                      placeholder="ex: 5"
                      onChange={(e) => {
                        setDishPrice(e.target.value);
                      }}
                    />
                  </label>
                  <div className="flex justify-between items-center w-full">
                    <button
                      onClick={() => {
                        setAddProductModal(false);
                        setOverlay(false);
                      }}
                      className="border w-[110px] border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]"
                      onClickCapture={() => {
                        addNewDish();
                      }}
                    >
                      + Add
                    </button>
                    <button
                      onClick={() => {
                        setAddProductModal(false);
                        setOverlay(false);
                      }}
                      className="border w-[110px] border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
        {/* ================ ADD NEW DISH MODAL END ================ */}
      </main>
      {overlay && (
        <div className="fixed z-40 top-0 bottom-0 left-0 right-0 bg-[#000] opacity-40"></div>
      )}
    </div>
  );
};

export default CategoriesList;
