import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/noble-restaurant-logo-osogbo.png";
import { ShoppingCart, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      aria-label="Main navigation header"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo (SEO: alt includes brand + location) */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Noble Restaurant Osogbo Nigerian Food Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "hover:text-red-500 transition"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="View cart" className="relative p-2">
            <ShoppingCart />
            <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">
              0
            </span>
          </button>

          <button className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
            Reserve a Table
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-500"
            >
              {link.name}
            </NavLink>
          ))}

          <button className="w-full bg-red-600 text-white py-2 rounded-md">
            Reserve a Table
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
