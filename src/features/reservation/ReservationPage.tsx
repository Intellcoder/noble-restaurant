import { useState } from "react";
import HeroSection from "./Pages/HeroPage";
import StepIndicator from "./components/StepIndicator";
import StepDateAndTime from "./components/StepTime";
import StepGuestDetails from "./components/StepGuest";
import StepConfirm from "./components/StepConfirm";
import { api } from "../../shared/api";
import { toast } from "react-hot-toast";

const STEPS = [
  { label: "Date & Time" },
  { label: "Details" },
  { label: "Confirm" },
];

const DEFAULT_FORM = {
  // Step 1
  date: "",
  noOfGuest: 2,
  time: "",
  // Step 2
  fullName: "",
  phone: "",
  email: "",
  occasion: "Birthday",
  specialRequests: "",
};

type FormData = typeof DEFAULT_FORM;

const ReservationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    // TODO: call your API here before setting confirmed
    try {
      const res = await api.post("/reservation", formData);
      if (res.status === 200) {
        toast.success("Resevation created successfully");
        setConfirmed(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Reservation Failed");
    }
  };

  const scrollToForm = () => {
    document
      .getElementById("reservation-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const goNext = () => {
    setCurrentStep((s) => s + 1);
    scrollToForm();
  };

  const goBack = () => {
    setCurrentStep((s) => s - 1);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Hero with restaurant background */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <HeroSection />
        {/* Overlay title for reservation page */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-playfair drop-shadow-lg">
            Reserve Your Table
          </h1>
          <p className="text-gray-200 mt-3 text-sm md:text-base drop-shadow">
            Secure your dining experience at Noble Restaurant
          </p>
        </div> */}
      </div>

      {/* Stepper + Form */}
      <div id="reservation-form" className="max-w-2xl mx-auto px-4 pb-16">
        {/* Step indicator */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8 mb-4">
          <StepIndicator
            steps={STEPS}
            currentStep={confirmed ? 4 : currentStep}
          />
        </div>

        {/* Step content */}
        {currentStep === 1 && !confirmed && (
          <StepDateAndTime
            formData={{
              date: formData.date,
              noOfGuest: formData.noOfGuest,
              time: formData.time,
            }}
            onChange={handleChange}
            onNext={goNext}
          />
        )}

        {currentStep === 2 && !confirmed && (
          <StepGuestDetails
            formData={{
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              occasion: formData.occasion,
              specialRequests: formData.specialRequests,
            }}
            onChange={handleChange}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {(currentStep === 3 || confirmed) && (
          <StepConfirm
            formData={formData}
            onBack={goBack}
            onConfirm={handleConfirm}
            confirmed={confirmed}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
