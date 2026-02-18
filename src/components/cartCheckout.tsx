import React, { FormEvent } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context";
import { ICartItem } from "../models/cart";
import { products } from "../data";
import { framer_money } from "./cart/framer";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

export const CartCheckout: React.FC = () => {
  const context = useCart();
  const cart = context?.cart;

  const prices = cart?.map((cartItem: ICartItem) => {
    const { id, quantity } = cartItem;
    const product = products.find((product) => product.id === id);
    return (product?.price ?? 0) * quantity;
  });

  const price = prices?.reduce(
    (previousValue: number, currentValue: number) =>
      previousValue + currentValue,
    0,
  );

  const nf = new Intl.NumberFormat();

  return (
    <div className="p-6 bg-[#fafafa] shadow-sm">
      <p className="flex justify-between mb-4">
        <span className="uppercase text-[#6d6d6]">total</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={price} className="font-black" {...framer_money}>
            ${nf.format(price ? price : 0)}
          </motion.span>
        </AnimatePresence>
      </p>
      <CheckoutLink />
    </div>
  );
};

const CheckoutLink: React.FC = () => {
  const context = useCart();
  const cart = context?.cart;
  const emptyCart = !cart || cart.length < 1;

  const merged = cart?.map((item) => {
    return {
      ...item,
      ...products.find((product) => product.id === item.id),
    };
  });

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(merged),
    });
    toast.loading("Redirecting...");

    if (response.status === 500) return;

    const data = await response.json();

    if (!stripe) return;

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    if (error) console.warn(error.message);
  };

  return (
    <button
      className={`flex w-full justify-center items-center p-6 gap-2 uppercase font-bold text-white bg-orange-500 hoverBtn ${emptyCart && "pointer-events-none opacity-50"}`}
      onClick={(e: FormEvent) => handleCheckout(e)}
    >
      <TiShoppingCart />
      checkout
    </button>
  );
};
