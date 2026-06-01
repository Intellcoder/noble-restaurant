import { Helmet } from "react-helmet-async";
import {
  UtensilsCrossed,
  Clock3,
  MapPin,
  Truck,
  Star,
  Phone,
} from "lucide-react";

import aboutBanner from "../../../assets/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg";
import chefImage from "../../../assets/jason-leung-poI7DelFiVA-unsplash.jpg";
import diningImage from "../../../assets/patrick-tomasso-GXXYkSwndP4-unsplash.jpg";

const AboutPage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          About Noble Restaurant Osogbo | Best Nigerian Restaurant in Osun State
        </title>

        <meta
          name="description"
          content="Learn about Noble Restaurant Osogbo — one of the best Nigerian restaurants in Osun State offering delicious local meals, food delivery, reservations, and premium dining experience."
        />

        <meta
          name="keywords"
          content="About Noble Restaurant Osogbo, Best Restaurant in Osogbo, Nigerian food restaurant Osun State, Food delivery Osogbo, Restaurant reservation Osogbo"
        />

        <link rel="canonical" href="https://noblerestaurant.com/about" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="About Noble Restaurant Osogbo" />

        <meta
          property="og:description"
          content="Premium Nigerian dining experience in Osogbo, Osun State."
        />

        <meta
          property="og:image"
          content="https://noblerestaurant.com/images/about-noble-restaurant-osogbo.jpg"
        />

        <meta property="og:url" content="https://noblerestaurant.com/about" />

        <meta property="og:type" content="website" />

        {/* JSON-LD SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Noble Restaurant",
            image:
              "https://noblerestaurant.com/images/about-noble-restaurant-osogbo.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Osogbo",
              addressRegion: "Osun State",
              addressCountry: "Nigeria",
            },
            servesCuisine: ["Nigerian Cuisine", "African Cuisine"],
            telephone: "+2348123456789",
            url: "https://noblerestaurant.com",
            priceRange: "₦₦",
          })}
        </script>
      </Helmet>

      <main className="bg-[#FAF7F2] text-gray-800">
        {/* HERO SECTION */}
        <section className="relative h-[70vh] overflow-hidden">
          <img
            src={aboutBanner}
            alt="About Noble Restaurant Osogbo"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-center justify-center text-center px-5">
            <div className="max-w-4xl text-white">
              <p className="uppercase tracking-[4px] text-red-400 font-medium">
                Welcome to Noble Restaurant
              </p>

              <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
                Premium Nigerian Dining Experience in Osogbo
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
                Delicious Nigerian meals, elegant dining atmosphere, fast
                delivery, and unforgettable food experiences in Osun State.
              </p>
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="max-w-7xl mx-auto px-5 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="relative">
              <img
                src={chefImage}
                alt="Nigerian chef preparing meals at Noble Restaurant Osogbo"
                className="rounded-3xl shadow-2xl object-cover h-[550px] w-full"
              />

              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-3xl shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm mt-1">Years of Culinary Excellence</p>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <p className="text-red-600 font-semibold uppercase tracking-widest">
                Our Story
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Bringing Authentic Nigerian Flavors to Osogbo
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Noble Restaurant was founded with one mission — to create a
                restaurant where people can enjoy authentic Nigerian dishes in a
                warm, modern, and premium environment.
              </p>

              <p className="mt-5 text-gray-600 leading-relaxed text-lg">
                From perfectly prepared Jollof Rice to rich soups, grills,
                swallows, and signature local delicacies, every meal is crafted
                with quality ingredients and exceptional attention to taste.
              </p>

              {/* FEATURES */}
              <div className="grid sm:grid-cols-2 gap-5 mt-10">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <UtensilsCrossed className="text-red-600 mb-3" />

                  <h3 className="font-semibold text-lg">Authentic Cuisine</h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Freshly prepared Nigerian dishes made with premium
                    ingredients.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <Truck className="text-red-600 mb-3" />

                  <h3 className="font-semibold text-lg">Fast Delivery</h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Quick and reliable food delivery across Osogbo.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <Clock3 className="text-red-600 mb-3" />

                  <h3 className="font-semibold text-lg">Timely Service</h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Prompt meal preparation and excellent customer experience.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <Star className="text-red-600 mb-3" />

                  <h3 className="font-semibold text-lg">Premium Experience</h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Elegant atmosphere designed for comfort and relaxation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DINING EXPERIENCE */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-red-600 uppercase font-semibold tracking-widest">
                Why Customers Love Us
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                More Than a Restaurant — A Food Experience
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Noble Restaurant combines traditional Nigerian hospitality with
                modern dining excellence. Whether you are dining with family,
                ordering online, or reserving a table for a special occasion, we
                ensure every experience feels memorable.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex gap-4">
                  <MapPin className="text-red-600" />

                  <div>
                    <h3 className="font-semibold">
                      Located in Osogbo, Osun State
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Easily accessible for dine-in, pickup, and food delivery.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-red-600" />

                  <div>
                    <h3 className="font-semibold">
                      Reservation & Delivery Support
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Friendly support team available for reservations and
                      customer assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={diningImage}
                alt="Dining area inside Noble Restaurant Osogbo"
                className="rounded-3xl shadow-2xl object-cover h-[550px] w-full"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-5">
          <div className="max-w-5xl mx-auto bg-red-600 rounded-[40px] p-10 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience Noble Restaurant?
            </h2>

            <p className="mt-6 text-lg text-red-100 max-w-2xl mx-auto">
              Explore our delicious Nigerian menu, reserve a table, or order
              food online today.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="/menu"
                className="bg-white text-red-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Explore Menu
              </a>

              <a
                href="/reservation"
                className="border border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-red-600 transition"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
