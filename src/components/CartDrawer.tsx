"use client";

import { useCart } from "@/store/useCart";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cartItems, isOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Frosted Glass Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Sliding Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-black/5 shadow-2xl z-50 p-6 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-black/5">
                <h2 className="font-serif text-2xl text-[#261B14] font-bold tracking-wide">Your Collection</h2>
                <button
                  onClick={() => toggleCart(false)}
                  className="text-black/60 hover:text-warm-cedar transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart List */}
              <div className="mt-6 space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-black/40 font-sans text-sm tracking-wider">
                    Your exhibition cart is empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.woodType}-${item.size}`}
                      className="flex gap-4 pb-6 border-b border-black/5"
                    >
                      <div className="w-20 h-20 bg-[#FDFBF7] border border-black/5 relative overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-warm-cedar font-semibold uppercase tracking-wider text-center p-1">
                        {item.name}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-base text-[#261B14] font-bold leading-tight">{item.name}</h3>
                          <p className="font-sans text-[10px] text-warm-cedar tracking-widest uppercase mt-1">
                            {item.woodType} / {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-3 border border-black/10 px-2 py-1 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.woodType, item.size, item.quantity - 1)}
                              className="text-black/60 hover:text-warm-cedar cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-sans text-xs text-[#261B14] w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.woodType, item.size, item.quantity + 1)}
                              className="text-black/60 hover:text-warm-cedar cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-sans text-sm text-black/90 font-bold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>

                          <button
                            onClick={() => removeFromCart(item.id, item.woodType, item.size)}
                            className="text-black/40 hover:text-red-500 transition-colors cursor-pointer ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total & Checkout Summary */}
            <div className="border-t border-black/10 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-xs text-black/60 uppercase tracking-widest">Estimated Value</span>
                <span className="font-serif text-2xl text-warm-cedar font-bold">${total.toLocaleString()}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-warm-cedar disabled:bg-warm-cedar/25 disabled:cursor-not-allowed text-white py-4 font-sans text-xs font-bold tracking-widest uppercase hover:bg-burnt-walnut transition-colors cursor-pointer shadow rounded-xl"
              >
                Proceed to Acquisition
              </button>
              <p className="text-center text-[10px] text-black/40 mt-3 font-sans">
                Includes complimentary White-Glove Art Courier delivery.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
