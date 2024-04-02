import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProduct: (product: CartProductType) => void;
  handleQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  console.log("qty", cartTotalQty);
  console.log("amount", cartTotalAmount);

  // console.log(cartTotalQty);

  // SAVE DATA TO LOCAL STORAGE
  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const productsInCart: CartProductType[] | null = JSON.parse(cartItems);

    setCartProducts(productsInCart);
  }, []);

  // CALCULATE TOTAL QUANTITY OF ITEMS IN CART
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  /// function to add items to cart///////////////

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart = prev ? [...prev, product] : [product];

      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product added to cart");
  }, []);

  //function to remove items from cart
  //REMOVE ONE ITEM
  const handleRemoveProduct = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);

        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
        toast.success("Product removed from cart");
      }
    },
    [cartProducts]
  );

  // CLEAR ALL ITEMS IN CART
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    localStorage.removeItem("eShopCartItems");
  }, []);

  //function to manage quantity of items in cart

  //INCREASE
  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 10) {
        return toast.error("no more items can be added to cart");
      }
      if (!cartProducts) return;
      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartProducts(updatedCart);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    },
    [cartProducts, setCartProducts]
  );

  //DECREASE
  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (!cartProducts || product.quantity === 1) return;

      const updatedCart = cartProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartProducts(updatedCart);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    },
    [cartProducts, setCartProducts]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts: cartProducts || [], // Ensure cartProducts is always an array
    handleAddProductToCart,
    handleRemoveProduct,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
