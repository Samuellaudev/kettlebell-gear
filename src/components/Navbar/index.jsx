import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-white shadow ">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="/">
            <img
              className="w-auto h-14"
              src="/src/assets/Logo.png"
              alt="Logo"
            />
          </a>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <img
                  className="w-auto h-6"
                  src="/svg/menu/mobile-menu_open-button.svg"
                  alt="mobile menu - open button"
                  />
              ) : (
                <img
                  className="w-auto h-6"
                  src="/svg/menu/mobile-menu_cross-button.svg"
                  alt="mobile menu - close button"
                  />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Home
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Shop
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              About
            </a>
          </div>

          <div className="flex justify-center md:block">
            <a
              className="relative text-gray-700 transition-colors duration-300 transform  hover:text-gray-600"
              href="#"
            >
              <img
                className="w-auto h-6"
                src="/svg/menu/cart.svg"
                alt="cart"
                />

              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
