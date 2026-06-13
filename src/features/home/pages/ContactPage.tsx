import { Helmet } from "react-helmet-async";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Send,
  UtensilsCrossed,
  Truck,
  Users,
} from "lucide-react";

import contactBanner from "../../../assets/restaurant 2.jpeg";

const ContactUsPage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          Contact Noble Restaurant Osogbo | Reservations, Catering & Food Orders
        </title>

        <meta
          name="description"
          content="Contact Noble Restaurant Osogbo for food orders, reservations, catering services, event meals, food delivery, and customer support in Osun State, Nigeria."
        />

        <meta
          name="keywords"
          content="Noble Restaurant contact, Catering services Osogbo, Nigerian catering Osun State, Food delivery Osogbo, Restaurant reservations Osogbo, Event catering Nigeria"
        />

        <link rel="canonical" href="https://noblerestaurant.com/contact" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="Contact Noble Restaurant Osogbo" />

        <meta
          property="og:description"
          content="Reach out to Noble Restaurant for reservations, catering services, and delicious Nigerian meals in Osogbo."
        />

        <meta
          property="og:image"
          content="https://noblerestaurant.com/images/noble-restaurant-contact-osogbo.jpg"
        />

        <meta property="og:url" content="https://noblerestaurant.com/contact" />

        <meta property="og:type" content="website" />

        {/* SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Noble Restaurant",
            image:
              "https://noblerestaurant.com/images/noble-restaurant-contact-osogbo.jpg",
            telephone: "+2348123456789",
            email: "hello@noblerestaurant.com",
            url: "https://noblerestaurant.com/contact",
            servesCuisine: ["Nigerian Cuisine", "African Cuisine"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Osogbo",
              addressRegion: "Osun State",
              addressCountry: "Nigeria",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Restaurant & Catering Services",
            },
          })}
        </script>
      </Helmet>

      <main className="bg-[#FAF7F2] text-gray-800">
        {/* HERO SECTION */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={contactBanner}
            alt="Contact Noble Restaurant Osogbo"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="max-w-4xl text-white">
              <p className="uppercase tracking-[5px] text-red-400 font-medium">
                Get In Touch
              </p>

              <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
                Contact Noble Restaurant Osogbo
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
                Reservations, catering services, event meals, food delivery,
                customer support, and premium Nigerian dining experience.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT SIDE */}
            <div>
              <p className="text-red-600 uppercase tracking-widest font-semibold">
                Contact Information
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                We Would Love to Hear From You
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Whether you want to reserve a table, place a food order, request
                catering services for events, or make inquiries, our team is
                always ready to assist you.
              </p>

              {/* CONTACT CARDS */}
              <div className="mt-10 space-y-5">
                {/* PHONE */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Phone className="text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>

                    <p className="text-gray-500 mt-1">+234 706 104 8562</p>

                    <p className="text-sm text-gray-400 mt-2">
                      Available for reservations & support
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Mail className="text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>

                    <p className="text-gray-500 mt-1">
                      noblerestaurant5@gmail.com
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Catering inquiries & customer service
                    </p>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                    <MapPin className="text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Restaurant Location
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Osogbo, Osun State, Nigeria
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      Dine-in, pickup & delivery available
                    </p>
                  </div>
                </div>

                {/* HOURS */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Clock3 className="text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Opening Hours</h3>

                    <p className="text-gray-500 mt-1">Monday - Sunday</p>

                    <p className="text-sm text-gray-400 mt-2">
                      9:00 AM - 10:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* SERVICES */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold">Our Services</h3>

                <div className="grid sm:grid-cols-2 gap-5 mt-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <UtensilsCrossed className="text-red-600 mb-3" />

                    <h4 className="font-semibold">Restaurant Dining</h4>

                    <p className="text-sm text-gray-500 mt-2">
                      Enjoy premium Nigerian meals in a modern dining
                      atmosphere.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <Truck className="text-red-600 mb-3" />

                    <h4 className="font-semibold">Food Delivery</h4>

                    <p className="text-sm text-gray-500 mt-2">
                      Fast and reliable meal delivery across Osogbo.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <Users className="text-red-600 mb-3" />

                    <h4 className="font-semibold">Catering Services</h4>

                    <p className="text-sm text-gray-500 mt-2">
                      Professional catering for weddings, birthdays, corporate
                      events, and parties.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <Clock3 className="text-red-600 mb-3" />

                    <h4 className="font-semibold">Reservations</h4>

                    <p className="text-sm text-gray-500 mt-2">
                      Book tables easily for family dinners and special
                      occasions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl h-fit">
              <p className="text-red-600 uppercase tracking-widest font-semibold">
                Send a Message
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                Contact Our Team
              </h2>

              <p className="mt-4 text-gray-500 leading-relaxed">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>

              <form className="mt-10 space-y-6">
                {/* NAME */}
                <div>
                  <label className="block mb-2 font-medium">Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block mb-2 font-medium">Phone Number</label>

                  <input
                    type="tel"
                    placeholder="+234xxxxxxxxxx"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* SERVICE */}
                <div>
                  <label className="block mb-2 font-medium">
                    Service Needed
                  </label>

                  <select className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Restaurant Reservation</option>
                    <option>Food Delivery</option>
                    <option>Catering Services</option>
                    <option>Event Meals</option>
                    <option>Customer Support</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block mb-2 font-medium">Message</label>

                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-5">
          <div className="max-w-6xl mx-auto bg-red-600 rounded-[40px] p-10 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold">
              Need Catering for Your Event?
            </h2>

            <p className="mt-6 text-lg text-red-100 max-w-3xl mx-auto">
              Noble Restaurant offers professional catering services for
              weddings, birthdays, corporate events, parties, family gatherings,
              and special occasions across Osogbo and beyond.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:+2347061048562"
                className="bg-white text-red-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Call For Catering
              </a>

              <a
                href="/menu"
                className="border border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-red-600 transition"
              >
                Explore Menu
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUsPage;
