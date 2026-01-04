import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  let [isMenuToggle, setIsMenuToggle] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuToggle, setIsMenuToggle }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
