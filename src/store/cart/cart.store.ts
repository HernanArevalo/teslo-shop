import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State { 
  cart: CartProduct[];

  // addProductToCart
  // updateProductToCart
  // removeProductToCart

}


export const useCartStore = create<State>()(
  
  (set) => ({

    cart: []

}))