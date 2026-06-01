import { useEffect, useState } from "react";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  PartyPopper,
  MessageSquare,
  Trash2,
  User,
  Search,
  RefreshCw,
} from "lucide-react";

type ReservationType = {
  id: string;
  fullname: string;
  phoneNumber: string;
  date: string;
  time: string;
  noOfGuests: number;
  occasion?: string;
  specialRequest?: string | null;
};

// ── Single reservation card (mobile view) ────────────────────────────────────
const ReservationCard = ({
  reservation,
  onDelete,
  deleting,
}: {
  reservation: ReservationType;
  onDelete: (id: string) => void;
  deleting: boolean;
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
    {/* Header row */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="font-semibold text-gray-900">{reservation.fullname}</p>
        <a
          href={`tel:${reservation.phoneNumber}`}
          className="text-sm text-red-500 flex items-center gap-1 mt-0.5"
        >
          <Phone size={12} />
          {reservation.phoneNumber}
        </a>
      </div>
      {reservation.occasion && (
        <span className="text-xs bg-red-50 text-red-600 font-medium px-2 py-1 rounded-full whitespace-nowrap">
          {reservation.occasion}
        </span>
      )}
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar size={11} /> Date
        </span>
        <span className="font-medium text-gray-800">
          {new Date(reservation.date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={11} /> Time
        </span>
        <span className="font-medium text-gray-800">{reservation.time}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Users size={11} /> Guests
        </span>
        <span className="font-medium text-gray-800">
          {reservation.noOfGuests}
        </span>
      </div>
    </div>

    {/* Special request */}
    {reservation.specialRequest && (
      <div className="bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-600 flex gap-2">
        <MessageSquare size={14} className="text-gray-400 mt-0.5 shrink-0" />
        <span>{reservation.specialRequest}</span>
      </div>
    )}

    {/* Delete button */}
    <button
      onClick={() => onDelete(reservation.id)}
      disabled={deleting}
      className="w-full flex items-center justify-center gap-2 text-sm text-red-500 border border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded-xl transition-colors"
    >
      <Trash2 size={14} />
      {deleting ? "Deleting..." : "Delete Reservation"}
    </button>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Reservation = () => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reservation");
      setReservations(res.data.data || []);
    } catch {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const deleteReservation = async (id: string) => {
    try {
      setDeletingId(id);
      await api.delete(`/reservation/${id}`);
      setReservations((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reservation deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = reservations.filter(
    (r) =>
      r.fullname.toLowerCase().includes(search.toLowerCase()) ||
      r.phoneNumber.includes(search) ||
      r.occasion?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {reservations.length} total reservation
            {reservations.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={fetchReservations}
          disabled={loading}
          className="flex items-center gap-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name, phone or occasion..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition bg-white"
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
          <RefreshCw size={18} className="animate-spin" />
          <span className="text-sm">Loading reservations...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">
            {search
              ? "No reservations match your search"
              : "No reservations yet"}
          </p>
        </div>
      )}

      {/* ── MOBILE: card list (hidden on lg+) ────────────────────────────── */}
      {!loading && filtered.length > 0 && (
        <div className="grid gap-3 lg:hidden">
          {filtered.map((r) => (
            <ReservationCard
              key={r.id}
              reservation={r}
              onDelete={deleteReservation}
              deleting={deletingId === r.id}
            />
          ))}
        </div>
      )}

      {/* ── DESKTOP: table (hidden below lg) ─────────────────────────────── */}
      {!loading && filtered.length > 0 && (
        <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <User size={13} /> Name
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} /> Phone
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> Date
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> Time
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Users size={13} /> Guests
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <PartyPopper size={13} /> Occasion
                    </span>
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare size={13} /> Request
                    </span>
                  </th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {r.fullname}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`tel:${r.phoneNumber}`}
                        className="text-red-500 hover:underline"
                      >
                        {r.phoneNumber}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Date(r.date).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{r.time}</td>
                    <td className="px-5 py-4 text-gray-600">{r.noOfGuests}</td>
                    <td className="px-5 py-4">
                      {r.occasion ? (
                        <span className="text-xs bg-red-50 text-red-600 font-medium px-2.5 py-1 rounded-full">
                          {r.occasion}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-500 max-w-[200px] truncate">
                      {r.specialRequest || (
                        <span className="text-gray-300">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => deleteReservation(r.id)}
                        disabled={deletingId === r.id}
                        className="flex items-center gap-1.5 text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                      >
                        <Trash2 size={14} />
                        {deletingId === r.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
