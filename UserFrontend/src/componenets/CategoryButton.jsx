import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log({ pathname });

 const categories = [
  { id: 0, label: "Jewellery", route: "/jewellery" },
  { id: 1, label: "Clay-crafts", route: "/claycraft" },
  { id: 2, label: "Wood-crafts", route: "/wood" },
  { id: 3, label: "Woolen", route: "/woolen" },
];

  const handleItemClick = (route) => {
    navigate(route);
  };

  return (
    <div className="mt-8 flex flex-wrap space-x-12 justify-center  gap-8">
      {categories.map((item, index) => (
        <button
          key={index}
          onClick={() => handleItemClick(item.route)}
          className={
            pathname === item.route
              ? "px-10 py-2 bg-orange-200 border-2 border-orange-300 rounded-full font-bold "
              : "px-10 py-2 bg-orange-400 text-white rounded-full border border-orange-300 font-bold hover:bg-orange-500 transition-colors"
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
