"use client";
import { motion } from "framer-motion";
import { framer_background, framer_cart } from "./framer";
import { useCart } from "../../context";
import { BiShoppingBag } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { ICartItem } from "../../models/cart";
import { CartItem } from "./cart_items";
import { CartCheckout } from "../cartCheckout";
import { useRef } from "react";

interface IProps {
  fn: () => void;
}

export const Sidebar: React.FC<IProps> = ({ fn }) => {
  const ref = useRef(null);
  const cartContext = useCart();
  const cart = cartContext?.cart;
  const cartExists = !cart || cart.length === 0;

  return (
    <>
      <BlurredBackground onClose={fn} />
      <motion.div
        className="fixed right-0 bottom-0 w-full h-full max-w-md text-black flex flex-col justify-between overflow-y-scroll bg-[#f1f1f1] z-[999]"
        {...framer_cart}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <Header fn={fn} />
        {cartExists ? <EmptyCart /> : <RenderCart />}
        <CartCheckout />
      </motion.div>
    </>
  );
};

const BlurredBackground: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed top-0 bottom-0 right-0 left-0 bg-[#000000b3] blur-sm"
      {...framer_background}
      onClick={onClose}
      role="button"
      aria-label="Close cart"
    />
  );
};

const Header: React.FC<IProps> = ({ fn }) => {
  return (
    <div className="flex justify-between items-center p-6 shadow-md bg-[#fafafa]">
      <h3 className="uppercase ">cart</h3>
      <button onClick={fn} className="flex text-2xl">
        <VscChromeClose />
      </button>
    </div>
  );
};

const RenderCart: React.FC = () => {
  const cartContext = useCart();
  const cart = cartContext?.cart || [];

  return (
    <motion.ul className="flex flex-col gap-8 p-6" layout>
      {cart.map((item: ICartItem) => (
        <CartItem item={item} key={item.id} />
      ))}
    </motion.ul>
  );
};

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center ">
      <BiShoppingBag className="text-5xl" />
      <p className="uppercase text-center font-bold">your cart is empty</p>
    </div>
  );
};
