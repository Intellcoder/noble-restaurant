import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";
import {
  Plus,
  Trash2,
  Tag,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  PackagePlus,
  RefreshCw,
  X,
} from "lucide-react";

/** ── Types ─────────────────────────────────────────────────────────────────── */
type Food = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

type Combo = {
  id: string;
  name: string;
  description: string;
  items: Food[];
  price: number;
};

/** ── Combo card ────────────────────────────────────────────────────────────── */
const ComboCard = ({
  combo,
  onDelete,
  deleting,
}: {
  combo: Combo;
  onDelete: (id: string) => void;
  deleting: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{combo.name}</h3>
          {combo.description && (
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
              {combo.description}
            </p>
          )}
        </div>
        <span className="text-sm font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
          ₦{Number(combo.price).toLocaleString()}
        </span>
      </div>

      {/* Items preview */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {combo.items.length} item{combo.items.length !== 1 ? "s" : ""}
        </button>

        {expanded && (
          <div className="mt-2 flex flex-wrap gap-2">
            {combo.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-5 h-5 rounded object-cover"
                />
                <span className="text-xs text-gray-700">{item.name}</span>
                <span className="text-xs text-gray-400">
                  ₦{Number(item.price).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          Original total: ₦
          {combo.items.reduce((sum, i) => sum + i.price, 0).toLocaleString()}
        </span>
        <button
          onClick={() => onDelete(combo.id)}
          disabled={deleting}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Trash2 size={13} />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
};

/** ── Main page ─────────────────────────────────────────────────────────────── */
const Combos = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [loadingCombos, setLoadingCombos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    customPrice: "", // ← admin sets their own combo price
  });

  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  //   /** Fetch foods */
  //   useEffect(() => {

  //   }, []);

  const fetchFoods = async () => {
    try {
      setLoadingFoods(true);
      const res = await api.get("/food");
      setFoods(res.data.foods);
    } catch {
      toast.error("Failed to load foods");
    } finally {
      setLoadingFoods(false);
    }
  };
  /** Fetch combos */
  const fetchCombos = async () => {
    try {
      setLoadingCombos(true);
      const res = await api.get("/combo");
      console.log("combos:", res.data);
      setCombos(res.data.data);
    } catch {
      toast.error("Failed to load combos");
    } finally {
      setLoadingCombos(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchCombos();
  }, []);

  /** Toggle food selection */
  const toggleFood = (food: Food) => {
    setSelectedFoods((prev) =>
      prev.find((f) => f.id === food.id)
        ? prev.filter((f) => f.id !== food.id)
        : [...prev, food],
    );
  };

  /** Sum of selected food prices (for reference display) */
  const originalTotal = useMemo(
    () => selectedFoods.reduce((sum, f) => sum + f.price, 0),
    [selectedFoods],
  );

  const customPrice = Number(form.customPrice);
  const saving = originalTotal - customPrice;
  const hasSaving = customPrice > 0 && saving > 0;

  /** Create combo */
  const handleCreateCombo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter a combo name");
      return;
    }
    if (selectedFoods.length < 2) {
      toast.error("Select at least 2 foods for a combo");
      return;
    }
    if (!form.customPrice || customPrice <= 0) {
      toast.error("Please set a valid combo price");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: form.name,
        description: form.description,
        foodIds: selectedFoods.map((f) => f.id),
        price: customPrice, // ← admin's custom price sent to backend
      };

      const res = await api.post("/combo", payload);
      setCombos((prev) => [res.data, ...prev]);
      setForm({ name: "", description: "", customPrice: "" });
      setSelectedFoods([]);
      toast.success("Combo created!");
    } catch {
      toast.error("Failed to create combo");
    } finally {
      setSubmitting(false);
    }
  };

  /** Delete combo */
  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await api.delete(`/combo/${id}`);
      setCombos((prev) => prev.filter((c) => c.id !== id));
      toast.success("Combo deleted");
    } catch {
      toast.error("Failed to delete combo");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Combos</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Bundle foods together and set a custom combo price
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT: CREATE FORM ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-5 h-fit">
          <h2 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
            <PackagePlus size={18} className="text-red-500" />
            Create Combo
          </h2>

          <form onSubmit={handleCreateCombo} className="space-y-4">
            {/* Combo name */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Combo Name *
              </label>
              <input
                placeholder="e.g. Family Feast"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Description
              </label>
              <textarea
                placeholder="Brief description of the combo..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-red-400 transition"
              />
            </div>

            {/* Custom price */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Combo Price (₦) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  ₦
                </span>
                <input
                  type="number"
                  min={1}
                  placeholder="0"
                  value={form.customPrice}
                  onChange={(e) =>
                    setForm({ ...form, customPrice: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-400 transition"
                />
              </div>

              {/* Price breakdown hint */}
              {selectedFoods.length > 0 && (
                <div className="mt-2 text-xs space-y-0.5">
                  <div className="flex justify-between text-gray-400">
                    <span>Original total</span>
                    <span>₦{originalTotal.toLocaleString()}</span>
                  </div>
                  {hasSaving && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Customer saves</span>
                      <span>₦{saving.toLocaleString()}</span>
                    </div>
                  )}
                  {customPrice > originalTotal && (
                    <p className="text-amber-500">
                      ⚠ Combo price exceeds original total
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Selected foods chips */}
            {selectedFoods.length > 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Selected ({selectedFoods.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFoods.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFood(f)}
                      className="flex items-center gap-1.5 bg-white border border-gray-200 text-xs px-2 py-1 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
                    >
                      <img
                        src={f.imageUrl}
                        alt={f.name}
                        className="w-4 h-4 rounded object-cover"
                      />
                      {f.name}
                      <X size={10} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || selectedFoods.length < 2}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              {submitting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Create Combo
                </>
              )}
            </button>
          </form>

          {/* ── Food picker ─────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
              <UtensilsCrossed size={14} className="text-gray-400" />
              Pick Foods
            </h3>

            {loadingFoods ? (
              <div className="flex items-center gap-2 text-sm text-gray-400 py-4 justify-center">
                <RefreshCw size={14} className="animate-spin" />
                Loading foods…
              </div>
            ) : foods.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                No foods available
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {foods.map((food) => {
                  const isSelected = selectedFoods.some(
                    (f) => f.id === food.id,
                  );
                  return (
                    <button
                      key={food.id}
                      type="button"
                      onClick={() => toggleFood(food)}
                      className={`relative p-2 border rounded-xl text-left transition-all ${
                        isSelected
                          ? "border-red-400 bg-red-50 ring-1 ring-red-400"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                          >
                            <path
                              d="M1 3l2 2 4-4"
                              stroke="#fff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-14 object-cover rounded-lg mb-1.5"
                      />
                      <p className="text-xs font-medium text-gray-800 truncate">
                        {food.name}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-0.5 mt-0.5">
                        <Tag size={9} />₦{Number(food.price).toLocaleString()}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: COMBOS LIST ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-gray-900">
              All Combos
              {combos.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({combos.length})
                </span>
              )}
            </h2>
            <button
              onClick={fetchCombos}
              disabled={loadingCombos}
              className="flex items-center gap-1.5 text-sm border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              <RefreshCw
                size={13}
                className={loadingCombos ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loadingCombos ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
              <RefreshCw size={18} className="animate-spin" />
              <span className="text-sm">Loading combos…</span>
            </div>
          ) : combos.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white border border-gray-100 rounded-2xl">
              <PackagePlus size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No combos yet</p>
              <p className="text-sm mt-1">
                Create your first combo using the form
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {combos.map((combo) => (
                <ComboCard
                  key={combo.id}
                  combo={combo}
                  onDelete={handleDelete}
                  deleting={deletingId === combo.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Combos;
