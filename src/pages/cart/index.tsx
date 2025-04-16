
import { useContext } from "react";
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { CartContext } from '../../context/CartContext';
export function Cart() { 
    const {  cart, total,addToCart, removeFromCart , deleteFromCart } = useContext(CartContext); 
    return ( 
       <div className="w-full max-w-3xl mx-auto ">
        <h1 className="text-2xl font-bold text-center my-4 text-teal-600">Carrinho de Compras</h1>


        { cart.length=== 0 ? (
            <p className="text-center text-gray-500 " >Carrinho esta vazio</p>
        ): (
            <div className="space-y-4 p-3">
                {cart.map((item)=> (
                    <section key={item.id} className="flex items-center justify-between p-4 bg-white border-1 rounded border-[#a2dbd6] px-2 py-3 ">
                        <img 
                            src={item.cover} 
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-md transition-transform duration-300 hover:scale-110"
                        />
                        <div className="flex-1 ml-4" >
                           
                            <strong className="text-teal-600">
                                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                            </strong> 
                            <p className="text-gray-600 text-sm mt-1">
                                SubTotal: <span className="font-semibold">{item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</span>
                            </p> 
                        </div>
                        <div className="flex items-center  gap-3">
                            <button onClick={() => removeFromCart(item.id)  } className="hover:bg-teal-100 rounded-full transition-colors ">
                                <FaMinus className="h-4 w-4  text-teal-600"/>
                            </button>
                            {item.amount} 
                            <button  onClick={() => addToCart(item) } className="hover:bg-teal-100 rounded-full transition-colors ">
                                <FaPlus  className="h-4 w-4  text-teal-600"/>
                            </button>
                            <button onClick={() => deleteFromCart(item.id) } className="p-1 hover:bg-red-100 rounded-full transition-colors ml-1">
                                <MdClose  className="text-red-500 h4 w-4 "/>
                            </button>
                        </div>
                    </section>
                ))}
            </div>
        ) }

        {cart.length > 0 && (
             <div className="p-6 ">
             <div className="flex justify-between mt-4 items-center ">
                 <span className="text-lg font-semibold text-gray-800">Total: </span>
                 <span className="text-2xl font-bold text-teal-600">{total} </span>
             </div>
             <div className=" mt-5 flex justify-center">
                 <button onClick={() => toast.success('Compra realizada com sucesso') }
                     className="w-80 h-12 bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors ">
                     Finalizar Compra 
                 </button>
             </div>
             
         </div>
        )}
    </div>
      
    );
} 