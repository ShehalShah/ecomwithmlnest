import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-3xl font-bold hover:scale-110 transition-transform">
            Fashion Ecommerce
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-white text-lg hover:text-gray-300 transition-colors px-2 pb-3 border-b-2 border-white"
                activeClassName="text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white text-lg hover:text-gray-300 transition-colors"
                activeClassName="text-gray-300"
              >
                Image Display
              </Link>
            </li>
            {/* Add more links for other pages */}
          </ul>
          <div className="flex items-center">
          <input
              type="text"
              placeholder="Search..."
              className="w-96 bg-transparent border-2 border-white rounded-md text-white placeholder-white text-lg py-2 px-4 focus:outline-none"
            />
            {/* Add search icon or submit button here if needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
