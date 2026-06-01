import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock3 } from "lucide-react";
import logo from "../../assets/noble-restaurant-logo-osogbo.png";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] pt-16 pb-8 px-5 border-t">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* BRAND INFO */}
        <div>
          <Link to="/" className="inline-block">
            <img
              src={logo}
              alt="Noble Restaurant Osogbo Logo"
              className="h-14 w-auto"
            />
          </Link>

          <p className="mt-5 text-gray-600 leading-7">
            Where tradition meets table. Experience premium Nigerian cuisine and
            unforgettable dining in the heart of Osogbo.
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white p-3 rounded-full shadow-sm hover:bg-red-600 hover:text-white transition"
            >
              <CiFacebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/noblerestaurantng/"
              aria-label="Instagram"
              className="bg-white p-3 rounded-full shadow-sm hover:bg-red-600 hover:text-white transition"
            >
              <CiInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="bg-white p-3 rounded-full shadow-sm hover:bg-red-600 hover:text-white transition"
            >
              <CiTwitter size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-600">
            <li>
              <Link to="/" className="hover:text-red-600 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/menu" className="hover:text-red-600 transition">
                Menu
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-red-600 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/reservation" className="hover:text-red-600 transition">
                Reservation
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-red-600 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">Contact</h3>

          <div className="space-y-5 text-gray-600">
            <div className="flex items-start gap-3">
              <MapPin className="text-red-600 mt-1" size={18} />

              <p className="leading-7">
                Opposite KK Kosmos Filling Station, Oke-Baale, Osogbo, Osun
                State, Nigeria
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-red-600" size={18} />

              <a
                href="tel:+2347061048562"
                className="hover:text-red-600 transition"
              >
                +234 706 104 8562
              </a>
              <a
                href="tel:+2349159002340"
                className="hover:text-red-600 transition"
              >
                +234 915 900 2340
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-red-600" size={18} />

              <a
                href="mailto:noblerestaurant5@gmail.com"
                className="hover:text-red-600 transition"
              >
                noblerestaurant5@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* OPENING HOURS */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Opening Hours
          </h3>

          <div className="space-y-5 text-gray-600">
            <div className="flex items-start gap-3">
              <Clock3 className="text-red-600 mt-1" size={18} />

              <div>
                <p className="font-medium text-gray-800">Monday - Sunday</p>

                <p className="mt-1">09:00 AM - 10:30 PM</p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/reservation"
              className="inline-block mt-4 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t mt-14 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Noble Restaurant. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-red-600 transition"
            >
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-red-600 transition">
              Terms of Service
            </Link>

            <Link to="/cookies" className="hover:text-red-600 transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
