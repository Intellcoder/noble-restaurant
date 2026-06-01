import { useMemo } from "react";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  PartyPopper,
} from "lucide-react";

type FormData = {
  date: string;
  noOfGuest: number;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  occasion: string;
  specialRequests: string;
};

type Props = {
  formData: FormData;
  onBack: () => void;
  onConfirm: () => void;
  confirmed: boolean;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${d} ${months[+m - 1]} ${y}`;
};

// 🔥 Generate stable reservation number (does NOT change on re-render)
const generateReservationNumber = (name: string, date: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const datePart = date.replaceAll("-", "").slice(2); // YYMMDD style
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `NB-${initials}-${datePart}-${random}`;
};

const Row = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2.5 text-gray-400">
      {icon}
      <span className="text-sm text-gray-500">{label}</span>
    </div>

    <span className="text-sm font-medium text-gray-900 text-right max-w-[55%] break-words">
      {value}
    </span>
  </div>
);

const StepConfirm = ({ formData, onBack, onConfirm, confirmed }: Props) => {
  // 🔥 stable reservation number (generated once per form data change)
  const reservationNumber = useMemo(() => {
    return generateReservationNumber(formData.fullName, formData.date);
  }, [formData.fullName, formData.date]);

  if (confirmed) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-red-500" />
        </div>

        <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-2">
          Reservation Confirmed!
        </h2>

        {/* 🔥 Reservation Number */}
        <p className="text-sm font-semibold text-red-500 mb-3">
          {reservationNumber}
        </p>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Thank you,{" "}
          <span className="font-semibold text-gray-800">
            {formData.fullName}
          </span>
          . Your reservation has been secured. A confirmation will be sent to{" "}
          <span className="font-semibold text-gray-800">{formData.email}</span>.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-red-400" />
            <span>
              {formatDate(formData.date)} at {formData.time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={15} className="text-red-400" />
            <span>
              {formData.noOfGuest}{" "}
              {formData.noOfGuest === 1 ? "guest" : "guests"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PartyPopper size={15} className="text-red-400" />
            <span>{formData.occasion}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-1">
        Confirm Your Reservation
      </h2>

      <p className="text-sm text-gray-400 mb-6">
        Please review your details before confirming.
      </p>

      {/* 🔥 Preview Reservation ID */}
      <div className="mb-4 text-xs text-gray-500">
        Reservation ID preview:{" "}
        <span className="font-semibold text-gray-700">{reservationNumber}</span>
      </div>

      <div className="mb-6">
        <Row
          icon={<Calendar size={15} />}
          label="Date"
          value={formatDate(formData.date)}
        />
        <Row icon={<Clock size={15} />} label="Time" value={formData.time} />
        <Row
          icon={<Users size={15} />}
          label="Party Size"
          value={`${formData.noOfGuest} ${
            formData.noOfGuest === 1 ? "guest" : "guests"
          }`}
        />
        <Row icon={<User size={15} />} label="Name" value={formData.fullName} />
        <Row icon={<Phone size={15} />} label="Phone" value={formData.phone} />
        <Row icon={<Mail size={15} />} label="Email" value={formData.email} />
        <Row
          icon={<PartyPopper size={15} />}
          label="Occasion"
          value={formData.occasion}
        />

        {formData.specialRequests && (
          <Row
            icon={
              <span className="w-[15px] h-[15px] flex items-center justify-center text-gray-400 text-xs">
                ✎
              </span>
            }
            label="Requests"
            value={formData.specialRequests}
          />
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mb-5 leading-relaxed">
        You will receive a confirmation via email & SMS after booking.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl transition text-sm"
        >
          Confirm Reservation
        </button>

        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3.5 rounded-xl transition text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default StepConfirm;
