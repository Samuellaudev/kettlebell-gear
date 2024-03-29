import { Product } from '../../shared.types'
import { useState, useEffect, useRef } from 'react';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { NavLink } from "react-router-dom";
import { resetCart } from '../../slices/cartSlice';
import { setCredentials } from '../../slices/authSlice';
import SearchBox from '../SearchBox';

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Admin menu
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(true);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  const toggleAdminDropdown = () => setIsAdminDropdownOpen(!isAdminDropdownOpen);
  const closeAdminDropdown = () => setIsAdminDropdownOpen(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setIsDropdownOpen(false);
      }

      if (adminDropdownRef.current && !adminDropdownRef.current.contains(e.target as HTMLElement)) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);  

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent ) => {
      if (event.key === 'userInfo' && event.newValue !== null) {
        dispatch(setCredentials({ ...JSON.parse(event.newValue) }));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
              src="/Logo.png"
              alt="Logo"
            />
          </NavLink>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
              aria-label="toggle menu"
            >
              {!isMobileMenuOpen ? (
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
            isMobileMenuOpen ? "block" : "hidden"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:mx-6 items-center">
          {/* <SearchBox /> */}
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/"
              onClick={ toggleMobileMenu }
            >
              Home
            </NavLink>
            <NavLink
              className="my-2 text-gray-700 transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
              to="/shop"
              onClick={ toggleMobileMenu }
            >
              Shop
            </NavLink>
            {/* To be confirmed: Contact & About */}

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
                  <div onClick={ closeDropdown } className="absolute left-24 -top-3 md:top-8 md:left-0 w-24 mt-2 origin-top-right bg-white rounded-md shadow-xl">
                    <NavLink
                      to="/profile"
                      onClick={ toggleMobileMenu }
                      className="block px-4 py-2 text-gray-800 rounded-md hover:bg-blue-500 hover:text-white">
                      Profile
                    </NavLink>
                    <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left text-gray-800 rounded-md hover:bg-blue-500 hover:text-white">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                className="text-gray-700 flex items-center transition-colors duration-300 transform  hover:text-blue-500 md:mx-4 md:my-0"
                to="/login"
                onClick={ toggleMobileMenu }
              >
                Login
              </NavLink>
            )}

            {/* Admin Links */ }
            { userInfo && userInfo.isAdmin && (
              <div className="relative inline-block py-1" ref={ adminDropdownRef }>
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
                  <div onClick={ closeAdminDropdown } className="absolute left-24 -top-2 md:top-8 md:left-0 w-24 mt-2 origin-top-right bg-white rounded-md shadow-xl">
                    <NavLink 
                      to="/admin/productlist"
                      onClick={ toggleMobileMenu }
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded-md"
                    >
                      Products
                    </NavLink>
                    <NavLink 
                      to="/admin/orderlist"
                      onClick={ toggleMobileMenu }
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded-md"
                    >
                      Orders
                    </NavLink>
                    <NavLink 
                      to="/admin/userlist"
                      onClick={ toggleMobileMenu }
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded-md"
                    >
                      Users
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-row justify-center py-1">
            <NavLink
              onClick={ toggleMobileMenu }
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
                  { cartItems.reduce((totalQty: number, currentItem: Product) => { 
                    return totalQty + (currentItem.qty || 0);
                  }, 0)}
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
