import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ShoppingCart, Menu, X } from "lucide-react";

import logo from "../../assets/noble-restaurant-logo-osogbo.png";

import Cart from "../../features/cart/pages/Cart";

import { useCartStore } from "../../store/cart.store";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className="
          sticky 
          top-0 
          z-50 
          bg-white/95 
          backdrop-blur-md 
          border-b
        "
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={logo}
                alt="Noble Restaurant Osogbo Logo"
                className="h-12 w-auto object-contain"
              />

              {/* OPTIONAL TEXT */}
              {/* <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-gray-900 leading-tight">
                  Noble Restaurant
                </h1>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} />

                  <span>Osogbo, Nigeria</span>
                </div>
              </div> */}
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              className="
                hidden 
                md:flex 
                items-center 
                gap-8
              "
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `
                    relative
                    font-medium
                    transition
                    hover:text-red-600
                    ${isActive ? "text-red-600" : "text-gray-700"}
                  `
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* CART BUTTON */}
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Open shopping cart"
                className="
                  relative
                  w-11
                  h-11
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                  hover:bg-red-50
                  transition
                "
              >
                <ShoppingCart size={20} className="text-gray-700" />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      min-w-[20px]
                      h-5
                      px-1
                      rounded-full
                      bg-red-600
                      text-white
                      text-xs
                      flex
                      items-center
                      justify-center
                      font-medium
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* RESERVATION BUTTON */}
              <Link
                to="/reservation"
                className="
                  hidden
                  md:flex
                  items-center
                  justify-center
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-medium
                  transition
                "
              >
                Reserve a Table
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="
                  md:hidden
                  w-11
                  h-11
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                "
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden
              border-t
              bg-white
              animate-in
              slide-in-from-top
            "
          >
            <nav className="px-5 py-5 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition
                    ${
                      isActive
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* MOBILE CTA */}
              <Link
                to="/reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  mt-4
                  w-full
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  py-3
                  rounded-xl
                  font-medium
                  flex
                  items-center
                  justify-center
                "
              >
                Reserve a Table
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* GLOBAL CART */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
