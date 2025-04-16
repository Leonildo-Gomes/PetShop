
import { useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ProductCart } from '../../components/productCart';
import { FvoriteContext } from '../../context/FavoritesContext';
export function Favorites() {
    const { favorites} = useContext(FvoriteContext); 

    if (favorites.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <Link to="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
                <FaArrowLeft className="h-5 w-5 mr-2" />
                Vontar para os produtos 
            </Link>
            <div className="text-center py-12">
              <MdFavoriteBorder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum favorito ainda</h2>
              <p className="text-gray-500">Comece a adicionar alguns produtos aos seus favoritos!</p>
            </div>
          </div>
          );
           
      }
    return(
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
             <Link to="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
                <FaArrowLeft className="h-5 w-5 mr-2" />
                Vontar para os produtos
            </Link>

            <h1 className='text-3xl font-bold text-gray-900 mb-8'>Meus Favoritos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2" >
            { favorites.map((item)=>(
                <ProductCart product={item} key={item.id} /> 
            )

            ) }
            </div>
        </main>
    )
} 