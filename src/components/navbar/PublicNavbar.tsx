import type { NavItem } from "../../types/landingPage";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutThunk } from "../../store/slice/Auth/auth.thunks";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/patient/doctors" },
    { label: "Blog", href: "#", hasDropdown: true },
    { label: "Contact Us", href: "#" },
  ];

  function handleLogin() {
    setIsOpen(false);
    navigate("/user/login");
  }

  function handleRegister() {
    setIsOpen(false);
    navigate("/user/register");
  }

  async function handleLogout() {
    await dispatch(logoutThunk());
    setProfileOpen(false);
    setIsOpen(false);
    navigate("/user/login");
  }

  return (
    <nav className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-gray-800">Irowz</span>
            <span className="text-blue-500">CURE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-700 hover:text-blue-500 flex items-center gap-1"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown size={16} />}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / Avatar */}
          {isAuthenticated ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
              >
                {initials}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/patient/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/patient/appointments");
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Appointments
                  </button>

                  <hr className="my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="secondary" onClick={handleRegister}>
                Register
              </Button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-blue-500"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3 border-t">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/patient/profile");
                      setIsOpen(false);
                    }}
                    className="text-left px-1 py-1"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/patient/appointments");
                      setIsOpen(false);
                    }}
                    className="text-left px-1 py-1"
                  >
                    My Appointments
                  </button>

                  <Button variant="secondary" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button variant="secondary" onClick={handleRegister}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
