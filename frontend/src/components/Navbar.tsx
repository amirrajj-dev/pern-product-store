import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa"; 
import { IoMdColorPalette } from "react-icons/io"; 
import { FaCartShopping } from "react-icons/fa6"; 
import { HiMenu } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [cartCount] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const themes = ["light", "dark", "cupcake", "forest", "aqua", "acid", "coffee", "sunset", "abyss", "winter", "dracula"]

  useEffect(()=>{
    if (!localStorage.getItem('pern-product-store')){
        localStorage.setItem('pern-product-store', JSON.stringify({theme: "dark"}));
    }else{
        const storedTheme = JSON.parse(localStorage.getItem('pern-product-store') as string).theme;
        document.documentElement.setAttribute("data-theme", storedTheme);
    }
  } , [])
  const switchTheme = (newTheme: string) => {
    localStorage.setItem('pern-product-store', JSON.stringify({theme: newTheme}));
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-base-100 shadow-md relative">
      <div className="flex items-center gap-2">
        <FaBox className="text-primary text-2xl sm:text-3xl" />
        <span className="sm:text-xl font-semibold">ProductStore</span>
      </div>

      <div className="lg:hidden relative">
        <button
          className="p-2 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <HiMenu className="text-xl sm:text-3xl" />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute right-0 mt-2 bg-base-100 shadow-lg rounded-lg w-48 p-2 z-50">

            <div className="dropdown dropdown-end w-full">
              <label tabIndex={0} className="btn btn-ghost w-full flex items-center gap-2 justify-center">
                <IoMdColorPalette size={24} className="text-gray-700" />
                <span>Themes</span>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-full">
                {themes.map((themeOption) => (
                  <li key={themeOption}>
                    <button onClick={() => switchTheme(themeOption)}>{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}</button>
                  </li>
                ))}
              </ul>
            </div>

            <button className="relative p-2 w-full flex items-center justify-center mt-2">
              <FaCartShopping size={24} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost rounded-full p-2 flex items-center gap-2">
            <IoMdColorPalette size={24} className="text-gray-700" />
            <span className="hidden sm:block">Themes</span>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-40">
            {themes.map((themeOption) => (
              <li key={themeOption}>
                <button onClick={() => switchTheme(themeOption)}>{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}</button>
              </li>
            ))}
          </ul>
        </div>

        <button className="relative p-2 rounded-full">
          <FaCartShopping size={24} className="text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;