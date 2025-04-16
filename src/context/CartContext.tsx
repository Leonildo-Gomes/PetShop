import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";
interface CartContextData {
    cart: CartProps[];
    cartAmount: number; 
    total:string;
    addToCart: (product: ProductProps) => void; 
    removeFromCart: (productId: number) => void; 
    deleteFromCart: (productId: number) => void; 
}
interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    category: string; 
    amount: number; 
    total: number;   
} 

interface CartProviderProps {
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);  

function CartProvider({ children }: CartProviderProps)  { 

    const [cart, setCart]= useState<CartProps[]> ([]);
    const [total, setTotal]= useState<string> ('');
    function addToCart(newProduct: ProductProps) {
        //Validation if the product is already in the cart 
        const productIndex = cart.findIndex(product => product.id === newProduct.id); // -1 if not found 
        if(productIndex !== -1 ) {
            const cartList=cart;
            cartList[productIndex].amount++;
            cartList[productIndex].total = cartList[productIndex].amount * cartList[productIndex].price; 
            setCart(cartList);
            calculateTotal(cartList);
            return;
        }

        const product: CartProps  = {
            ...newProduct,
            amount: 1,
            total: newProduct.price
        }
        setCart(item => [...item, product]);  
        calculateTotal([...cart, product]); 

    }
    function removeFromCart(productId: number) {
        const productIndex = cart.findIndex(item => item.id === productId); 
        if(cart[productIndex]?.amount> 1) {
            const cartList=cart; 
            cartList[productIndex].amount--; 
            cartList[productIndex].total = cartList[productIndex].total - cartList[productIndex].price; 
            setCart(cartList); 
            calculateTotal(cartList); 
            return;
        }
        deleteFromCart(productId);    
    }

    function deleteFromCart(productId: number) { 
        const cartList = cart.filter(item => item.id !== productId); 
        setCart(cartList); 
        calculateTotal(cartList); 
    }
    function calculateTotal(items: CartProps[]) {
        const total = items.reduce((acc, item) => acc + item.total, 0);
        setTotal(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }
    return (
        <CartContext.Provider value={{cart: cart, cartAmount: cart.length, total: total, addToCart, removeFromCart, deleteFromCart  }}>
            {children}
        </CartContext.Provider> 
    )

}


export default CartProvider;


