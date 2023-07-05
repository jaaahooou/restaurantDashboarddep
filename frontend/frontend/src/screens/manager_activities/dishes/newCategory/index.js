import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarManagmentPanel from '../../../../components/navbars/NavbarManagmentPanel';
import { FiMoreHorizontal } from 'react-icons/fi';
import NavbarManagmentPanelSide from '../../../../components/navbars/NavbarManagmentPanelSide';
import { listCategories } from '../../../../actions/categoriesActions';
import { listDishes } from '../../../../actions/dishActions';
const NewCategory = () => {
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categoriesError, categoriesLoading, categories } = categoriesList;
  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listDishes());
  }, []);

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [openListDishes, setOpenListDishes] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openNewProductPanel, setOpenNewProductPanel] = useState(false);
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSelectProduct = (productId) => {
    const product = dishes.find((item) => item.id == productId);
    const isAlreadySelected = selectedProducts.some(
      (product) => product.id === productId
    );

    if (!isAlreadySelected) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        product,
      ]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== productId)
    );
  };
  return (
    <div className="flex flex-col relative h-screen w-full">
      <NavbarManagmentPanel />
      <NavbarManagmentPanelSide />
      <main className="my-4 px-1 flex flex-col md:absolute md:h-screen md:w-[calc(100%_-_270px)]  md:p-[30px] md:left-[270px] md:top-0;">
        <section className="flex flex-col gap-3 my-4">
          <div className="flex justify-between items-center">
            <header className="font-bold py-1 border-b text-xl border-[#cbd5e1]">
              Add Category
            </header>
            <button className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 bg-[#0369a1] hover:bg-[#0284c7] text-white font-bold rounded">
              Save
            </button>
          </div>
          <header className="font-bold py-1 border-b border-[#cbd5e1]">
            Basics
          </header>
          <div className="flex flex-col gap-2">
            <label
              className="flex items-center gap-2 font-bold text-sm"
              htmlFor=""
            >
              Name
              <input
                className="border border-[#cbd5e1] py-1 pl-1 font-normal"
                type="text "
                placeholder={'Category Name'}
              />
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-sm">Button Color</p>

            <main className=" grid grid-cols-4 grid-flow-row gap-1 relative">
              <button
                onClick={() => setOpenColorPicker(!openColorPicker)}
                className="w-6 h-6 grow flex bg-secondary-bg-color border border-[#cbd5e1]"
                style={{ backgroundColor: selectedColor }}
              ></button>

              {openColorPicker && (
                <div className=" grid grid-cols-3 grid-flow-row gap-1 absolute top-0 left-10 border border-[#cbd5e1] p-1 w-24">
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
            </main>
          </div>
        </section>
        <section className="">
          <div className="flex justify-between items-center border-b border-[#cbd5e1]">
            <header className="font-bold py-1 ">Products</header>
            <div className="flex gap-2">
              <button
                onClick={() => setOpenListDishes(!openListDishes)}
                className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold hover:bg-[#f1f5f9]"
              >
                + Add from list
              </button>
              <button
                onClick={() => setOpenNewProductPanel(!openNewProductPanel)}
                className="border border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold hover:bg-[#f1f5f9]"
              >
                + Add new product
              </button>
            </div>
          </div>
          {openNewProductPanel && (
            <div className="py-2 flex flex-wrap  items-center gap-2 text-sm">
              <label className="font-bold flex items-center gap-2" htmlFor="">
                Product Name:
                <input
                  className="border border-[#cbd5e1] py-1 pl-1 font-normal"
                  type="text"
                  placeholder="Provide Name"
                />
              </label>
              <label className="font-bold flex items-center gap-2" htmlFor="">
                Product Price:
                <input
                  className="border border-[#cbd5e1] py-1 pl-1 font-normal"
                  type="text"
                  placeholder="Provide price"
                />
              </label>
              <button className="border  border-[#cbd5e1]  py-1 px-3 text-sm my-2 text-[#0369a1] font-bold rounded-md hover:bg-[#f1f5f9]">
                + Add
              </button>
            </div>
          )}

          <div className="my-4 ">
            <div className="grid grid-cols-3 border-b border-[#cbd5e1] ">
              <span className="text-sm font-bold pl-2">Name</span>
              <span className="text-sm font-bold  pl-2 place-self-center">
                Price
              </span>
            </div>
            {selectedProducts.map((product, index) => (
              <div
                key={product.id}
                className="grid grid-cols-3 items-center  rounded bg-[#f3f4f6] my-1 gap-1"
              >
                <span className="pl-2 text-[#0369a1] cursor-pointer">
                  {product.title}
                </span>
                <span className="pl-2 place-self-center text-[#0369a1] cursor-pointer">
                  {product.price}
                </span>

                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="place-self-end self-center mr-2 font-bold text-sm text-[#ef4444]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {openListDishes && (
            <div className="my-4">
              <header className="font-bold py-1 border-b border-[#cbd5e1]">
                Add from list
              </header>
              <div className="grid grid-cols-3 py-1 border-b">
                <span className="text-sm font-bold   pl-2">Name</span>
                <span className="text-sm font-bold  pl-2 place-self-center">
                  Price
                </span>
              </div>
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="grid grid-cols-3 items-center  rounded bg-[#f3f4f6] my-1 gap-1"
                >
                  <span className="pl-2 text-[#0369a1] cursor-pointer">
                    {dish.title}
                  </span>
                  <span className="text-[#0369a1] cursor-pointer place-self-center">
                    {dish.price}
                  </span>
                  <button
                    onClick={() => handleSelectProduct(dish.id)}
                    className="place-self-end self-center mr-2 font-bold text-sm  text-[#22c55e]"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NewCategory;
