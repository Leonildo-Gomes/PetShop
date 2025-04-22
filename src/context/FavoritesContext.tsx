import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";


interface FavoriteProps { 
    id: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    category: string;
 }
 interface FavoriteContextData {
    favorites: FavoriteProps[]; 
    toggleFavorite: (product: ProductProps) => void;
    isFavorites: (productId: string) => boolean;
    amount: number;
 }

 interface FavoriteProviderProps {
    children: ReactNode 
 }
export const FvoriteContext= createContext({ } as FavoriteContextData)


function FavoriteProvider({ children }: FavoriteProviderProps) {
     

    const [ favorites, setFavorites]= useState<FavoriteProps[]>([]);


    function isFavorites(productId: string ): boolean { 
        return favorites.some(item => item.id === productId);
    }
    function toggleFavorite(product: ProductProps) {
        
        if(isFavorites(product.id ) ) { // product is already in the favorite 
           
            setFavorites(favorites.filter(item => item.id !== product.id)); 
            return; 
        } else {
            setFavorites(favorites => [...favorites, product]); 
        }
    }
    return (
        <FvoriteContext.Provider value={{ favorites, isFavorites  , toggleFavorite, amount: favorites.length  }} >
            { children }
        </FvoriteContext.Provider>
    )

 }



 export default FavoriteProvider;
