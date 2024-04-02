"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CartProvidersProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProvidersProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
