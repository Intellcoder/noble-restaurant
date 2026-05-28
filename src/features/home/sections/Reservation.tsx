import { CalendarDays, Clock3, PhoneCall } from "lucide-react";
import ReservationForm from "../components/ReservationForm";

const Reservation = () => {
  return (
    <section className="relative w-full py-20 px-5 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white">
          <span className="text-red-500 uppercase tracking-[3px] text-sm font-medium">
            Reserve Your Experience
          </span>

          <h2 className="mt-4 font-[Playfair_Display] text-4xl md:text-5xl font-bold leading-tight">
            Book A Table For
            <span className="text-red-500"> Luxury Dining</span>
          </h2>

          <p className="mt-6 text-gray-300 leading-8 max-w-xl">
            Enjoy an unforgettable dining experience at Noble Restaurant,
            Osogbo. Reserve your table now for premium Nigerian cuisine, elegant
            ambience, and exceptional service.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-full">
                <CalendarDays size={20} />
              </div>

              <div>
                <h3 className="font-semibold">Easy Online Reservation</h3>

                <p className="text-gray-400 text-sm">
                  Reserve your preferred dining time instantly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-full">
                <Clock3 size={20} />
              </div>

              <div>
                <h3 className="font-semibold">Open Daily</h3>

                <p className="text-gray-400 text-sm">
                  Monday - Sunday | 09:00 AM - 11:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-3 rounded-full">
                <PhoneCall size={20} />
              </div>

              <div>
                <h3 className="font-semibold">Reservation Hotline</h3>

                <p className="text-gray-400 text-sm">+234 706 104 8562</p>
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION FORM */}
        <ReservationForm />
      </div>
    </section>
  );
};

export default Reservation;
