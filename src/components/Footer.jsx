import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white ">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <img
          className="w-auto h-14"
          src="/Logo.png"
          alt="Logo"
        />
        <p className="text-sm text-gray-600 ">© Copyright {currentYear}. All Rights Reserved.</p>
        <div className="flex -mx-2">
            <a href="https://www.linkedin.com/in/samuel-cf-lau/" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="Reddit">
              <img
                className="w-auto h-6"
                src="/images/icon-linkedin.svg"
                alt="LinkedIn Icon"
              />
            </a>
            <a href="https://www.instagram.com/samuel_cf_lau/" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="Facebook">
              <img
                  className="w-auto h-6"
                  src="/images/icon-instagram.svg"
                  alt="LinkedIn Icon"
                />
            </a>
            <a href="https://github.com/samuellaudev" className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500" aria-label="Github">
              <img
                className="w-auto h-6"
                src="/images/icon-github.svg"
                alt="LinkedIn Icon"
              />
            </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
