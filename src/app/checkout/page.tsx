"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="text-sm text-muted-foreground">
          Order ID: #NXA-{Math.random().toString(36).substring(2, 8).toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Shipping */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="Address"
                className="col-span-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-0 focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              Secured by Stripe. Your payment info is encrypted.
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Place Order • {formatPrice(getTotalPrice() * 1.08)}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border p-6 sticky top-24">
            <h2 className="font-semibold mb-4">Order Summary ({items.length} items)</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="truncate flex-1">{item.name} x{item.quantity}</span>
                  <span className="font-medium ml-2">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(getTotalPrice() * 0.08)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice() * 1.08)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
