import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth.ts";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-12 py-4 flex items-center justify-between fixed top-0 w-full h-16 shadow-md z-50">
      
      <h1 className="text-2xl font-bold tracking-wide absolute left-6 top-0">
        Google Books Search
      </h1>

      {/* Right Side - Navigation Links */}
      <div className="flex items-center space-x-8 ml-auto">
        <Link to="/search" className="text-white hover:text-gray-300 transition-all text-lg">
          Search for Books
        </Link>
        {Auth.loggedIn() && (
          <Link to="/saved" className="text-white hover:text-gray-300 transition-all text-lg">
            See Your Books
          </Link>
        )}
        {Auth.loggedIn() ? (
          <button 
            onClick={() => Auth.logout()} 
            className="text-white hover:text-gray-300 text-lg"
          >
            Logout
          </button>
        ) : (
          <Link to="/auth" className="text-white hover:text-gray-300 text-lg">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
