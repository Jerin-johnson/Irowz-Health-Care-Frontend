import type { NavItem } from "../../types/landingPage";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutThunk } from "../../store/slice/Auth/auth.thunks";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/patient/doctors" },
    { label: "Blog", href: "#", hasDropdown: true },
    { label: "Contact Us", href: "#" },
  ];

  function handleLogin() {
    navigate("/user/login");
  }

  function handleRegister() {
    navigate("/user/register");
  }

  async function handleLogout() {
    await dispatch(logoutThunk());
    navigate("/user/login");
  }

  return (
    <nav className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
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

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
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
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-700 hover:text-blue-500"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="secondary" onClick={handleRegister}>
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
