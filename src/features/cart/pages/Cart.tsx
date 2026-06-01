import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import { useCartStore } from "../../../store/cart.store";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Cart = ({ isOpen, onClose }: Props) => {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCartStore();

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* CART DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[430px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-red-600" />

            <h2 className="font-semibold text-lg">
              Your Cart ({items.length} items)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingCart size={60} className="text-gray-300" />

              <h3 className="mt-4 text-xl font-semibold">Your cart is empty</h3>

              <p className="text-gray-500 mt-2">
                Add delicious meals to continue.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border rounded-2xl p-4">
                <div className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="text-red-600 font-medium mt-1">
                        ₦{item.price.toLocaleString()}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-end mt-4">
                  <span className="font-semibold">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="border-t p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-2xl font-bold text-red-600">
                ₦{getTotalPrice().toLocaleString()}
              </span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
