import { useState, useEffect, useRef } from 'react';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { resetCart } from '../../slices/cartSlice';
import SearchBox from '../SearchBox';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Admin menu
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(true);
  const adminDropdownRef = useRef(null);

  const toggleAdminDropdown = () => setIsAdminDropdownOpen(!isAdminDropdownOpen);
  const closeAdminDropdown = () => setIsAdminDropdownOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }

      if (adminDropdownRef.current && !adminDropdownRef.current.contains(e.target)) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="relative bg-white shadow ">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img
              className="w-auto h-14"
              src="/src/assets/Logo.png"
              alt="Logo"
            />
          </NavLink>

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
          <div className="flex flex-col md:flex-row md:mx-6 items-center">
          <SearchBox />
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/shop"
            >
              Shop
            </NavLink>
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/contact"
            >
              Contact
            </NavLink>
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/about"
            >
              About
            </NavLink>

            {/* Logged-in User Links */}
            { userInfo ? (
              <div className="relative inline-block ml-1" ref={ dropdownRef }>
                {/* Dropdown toggle button */}
                <button
                  onClick={ toggleDropdown }
                  className="flex items-center py-1 px-2 text-gray-700 bg-white rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none"
                >
                  { userInfo.name }
                  <img 
                    src='/svg/menu/dropdown-menu_down-arrow.svg'
                    className="w-auto h-4 ml-1"
                    alt="dropdown menu"
                  />
                </button>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div onClick={ closeDropdown } className="absolute left-0 w-24 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl">
                    <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                      Profile
                    </NavLink>
                    <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-700 flex items-center transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              >
                Login
              </NavLink>
            )}

            {/* Admin Links */ }
            { userInfo && userInfo.isAdmin && (
              <div className="relative inline-block" ref={ adminDropdownRef }>
                {/* Admin Dropdown toggle button */}
                <button
                    onClick={ toggleAdminDropdown }
                    className="flex items-center py-1 px-2 text-gray-700 bg-white rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none"
                  >
                    Admin
                    <img 
                      src='/svg/menu/dropdown-menu_down-arrow.svg'
                      className="w-auto h-4 ml-1"
                      alt="admin dropdown menu"
                    />
                </button>
                {/* Admin Dropdown menu */}
                {isAdminDropdownOpen && (
                  <div onClick={ closeAdminDropdown } className="absolute left-0 w-24 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl">
                    <NavLink to="/admin/productlist" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                      Products
                    </NavLink>
                    <NavLink to="/admin/orderlist" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                      Orders
                    </NavLink>
                    <NavLink to="/admin/userlist" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                      Users
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-row justify-center">
            <NavLink
              className="relative text-gray-700 transition-colors duration-300 transform  hover:text-gray-600"
              to="/cart"
            >
              <img
                className="w-auto h-6"
                src="/svg/menu/cart.svg"
                alt="cart"
                />

              <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
            </NavLink>
            <div>
              { cartItems.length > 0 && (
                <span className="inline-block py-1 px-2 bg-green-600 text-white text-xs font-semibold rounded-full">
                  { cartItems.reduce((a, c) => a + c.qty, 0) }
                </span>)
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
