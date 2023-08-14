import React from "react";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

const ModalEditiDishes = ({
  closeModal,
  closeOverlay,
  selectedNameOFDish,
  selectedCategories,
  selectedPriceOFDish,
}) => {
  const dishList = useSelector((state) => state.dishList);
  const { error: dishListError, loading: dishListloading, dishes } = dishList;
  console.log(selectedNameOFDish, selectedCategories, selectedPriceOFDish);
  const categoriesList = useSelector((state) => state.categoriesList);
  const { categoriesError, categoriesLoading, categories } = categoriesList;
  return (
    <main className="bg-white p-4 max-w-[400px] w-full">
      <div className="flex justify-between items-center pb-2 border-b-2">
        <header className="text-2xl font-bold">Edit Dish</header>
        <button
          onClick={() => {
            closeModal(false);
            closeOverlay(false);
          }}
          className="text-3xl font-bold  hover:text-[#dc2626]"
        >
          <CgClose />
        </button>
      </div>

      <section className="flex flex-col gap-1">
        <label className="flex" htmlFor="">
          Name:
          <input
            className="w-full"
            type="text"
            value={selectedNameOFDish}
            placeholder="Name of Dish"
          />
        </label>
        <label htmlFor="">
          Select category:
          <select name="" id="">
            <option>{selectedCategories}</option>
            {categoriesList.categories.map((categoryItem) => (
              <option value={categoryItem.title}>{categoryItem.title}</option>
            ))}
          </select>
        </label>
        <label htmlFor="">
          Price:
          <input type="text" value={selectedPriceOFDish} placeholder="Price" />
        </label>
        <button>Update</button>
      </section>
    </main>
  );
};

export default ModalEditiDishes;
