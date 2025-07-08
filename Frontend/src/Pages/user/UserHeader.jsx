import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import { EventContext } from "../../context/EventProvider";

const UserNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLogged, setIsLogged, setRole } = useContext(AuthContext);
  const { setRegistered } = useContext(EventContext);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authCredentials");
    setIsLogged(false);
    setMobileOpen(false); 
    setRegistered([]); 
    setRole("");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div>
          <Link to="/events" className="text-xl font-bold tracking-wide">
            Events
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link to="/events" className="hover:underline">Home</Link></li>
          <li><Link to="/events/new" className="hover:underline">New</Link></li>
          <li><Link to="/events/past" className="hover:underline">Past</Link></li>
          <li><Link to="/events/registered" className="hover:underline">Registered</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          {!isLogged ? (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-600 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-800 text-white font-semibold px-4 py-1.5 rounded hover:bg-indigo-900 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/events" className="block py-1 hover:underline" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/events/new" className="block py-1 hover:underline" onClick={() => setMobileOpen(false)}>New</Link>
          <Link to="/events/past" className="block py-1 hover:underline" onClick={() => setMobileOpen(false)}>Past</Link>
          <Link to="/events/registered" className="block py-1 hover:underline" onClick={() => setMobileOpen(false)}>Registered</Link>
          <hr className="my-2 border-white/30" />

          {!isLogged ? (
            <>
              <Link
                to="/login"
                className="block bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-indigo-800 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-900 transition"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
