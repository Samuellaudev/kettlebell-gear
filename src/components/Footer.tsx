import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
    <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link to='/' className="cursor-pointer">
            <img
              className="w-auto h-14"
              src="/Logo.png"
              alt="Logo"
              />
          </Link>
          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <Link to="/" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Home"> Home </Link>
            <Link to="/shop" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Shop"> Shop </Link>
            <Link to="/privacy" className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Privacy"> Privacy </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">© Copyright {currentYear}. All Rights Reserved.</p>
            <div className="flex -mx-2 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="LinkedIn">
                <img
                  className="w-auto h-6"
                  src="/images/icon-linkedin.svg"
                  alt="LinkedIn Icon"
                />
              </a>
              <a href="https://www.instagram.com/" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="Instagram">
                <img
                    className="w-auto h-6"
                    src="/images/icon-instagram.svg"
                    alt="LinkedIn Icon"
                  />
              </a>
              <a href="https://github.com/" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="Github">
                <img
                  className="w-auto h-6"
                  src="/images/icon-github.svg"
                  alt="LinkedIn Icon"
                />
              </a>
          </div>
        </div>
    </div>
</footer>
  );
}

export default Footer;
