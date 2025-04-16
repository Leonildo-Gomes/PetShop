
import { useContext } from "react";
import { LuPawPrint, LuShoppingCart } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import { FvoriteContext } from '../../context/FavoritesContext';
export function Header() { 

    const {  cartAmount } = useContext(CartContext);
    const {  amount } = useContext(FvoriteContext); 
    return ( 
        <header className="w-full px-1 bg-white shadow-lg">
            <nav className=" w-full  h-15 flex items-center justify-between  mx-auto px-5 ">
                <div className="flex items-center gap-2 transition duration-300 hover:scale-110">
                    <div className="flex items-center">
                        <LuPawPrint className="h-8 w-8 text-teal-600" />
                    </div>
                    <Link to="/" className="font-bold text-teal-600 text-2xl">
                        PetShop
                    </Link>
                </div>
               
                 {/* Shopping Cart with Counter */}
                 <div className="flex items-center gap-4 transition duration-300 hover:scale-110 ">
                    <Link to={'/favorites'} className="p-2 rounded-full hover:bg-red-50 transition-colors relative text-red-500">
                        <MdFavoriteBorder className="h-6 w-6 text-red-500"/>
                        {amount > 0 && 
                            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ">
                                {amount} 
                            </span>
                        }

                    </Link>
                    
                    <Link to="/cart" className="relative hover:bg-teal-50 transition-colors ">
                        <LuShoppingCart  className="h-6 w-6 text-teal-600"/>
                        {cartAmount > 0 &&
                            <span className='absolute -top-2 -right-2  px-2.5 bg-teal-600 rounded-full w-5 h-5 font-bold flex items-center justify-center text-white text-xs'>
                                {cartAmount}
                            </span>
                        }
                    </Link> 
                 </div>
                
            </nav>
           
        </header>
    )
}