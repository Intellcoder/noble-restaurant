import { Helmet } from "react-helmet-async";
import HeroSection from "../sections/HeroSection";
import SignatureDishes from "../sections/SignatureDishes";
import Testimonials from "../sections/Testimonials";
import Reservation from "../sections/Reservation";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Noble Restraurant | Best Nigerian Food in Osogbo</title>

        <meta
          name="description"
          content="Order delicious Nigerian food in Osogbo. Fast delivery of jollof rice, soups, and more from Noble Restaurant."
        />

        {/* open Graph (whatsApp/Facebook preview) */}
        <meta property="og:title" content="Noble Restaurant Osogbo" />
        <meta
          property="og:description"
          content="Best Nigerian food in Osogbo"
        />
        <meta
          property="og:image"
          content="https://noble-restaurant.app/og/png"
        />
        <meta property="og:type" content="website" />

        {/* {twitter card} */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="bg-[#F7F3ED]">
        <HeroSection />
        <SignatureDishes />
        {/* <Testimonials /> */}
        <Reservation />
      </section>
    </>
  );
};

export default HomePage;
