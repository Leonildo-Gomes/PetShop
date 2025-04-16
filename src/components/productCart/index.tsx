import { BiSolidCartAdd } from "react-icons/bi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { ProductProps } from "../../pages/home";

import { useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import { FvoriteContext } from "../../context/FavoritesContext";
interface ProductCardProps {
    product: ProductProps;
    showFavoriteButton?: boolean;
  }
export function ProductCart({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorites } = useContext(FvoriteContext);

  function handleAddToCart(product: ProductProps) {
    addToCart(product);
    toast.success("Produtoadicionado ao carrinho");
  }
  function toggleToFavorite(product: ProductProps) {
    toggleFavorite(product);
    if (isFavorites(product?.id)) {
      toast.success("Produto removido dos favoritos");
      return;
    }
    toast.success("Produto adicionado aos favoritos");
  }

  return (
    <section
        key={product.id}
        className=" bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="flex items-center justify-end p-2 mb-3"></div>
            <div className="aspect-w-1 aspect-h-1">
                <Link to={`/detail/${product.id}`}>
                    <img
                    src={product.cover}
                    alt={product.title}
                    className="w-full rounded-lg  mb-2 "
                    />
                </Link>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                <div className="flex items-center justify-between mt-2">
                    <strong className="text-xl font-bold text-teal-600">
                        {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </strong>
                    <div className="flex space-x-2 ">
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center w-32 gap-2 bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition-colors "
                        >
                            <BiSolidCartAdd className="h-6 w-6 mr-1" />
                            Adicionar
                        </button>
                        
                        <button
                            onClick={(event) => {
                            event.preventDefault();
                            toggleToFavorite(product);
                            }}
                        >
                            {isFavorites(product.id) ? (
                            <MdFavorite className="h-6 w-6 text-red-500 hover:bg-red-50 rounded-full" />
                            ) : (
                            <MdFavoriteBorder className="h-6 w-6 text-gray-400 hover:bg-gray-50 rounded-full " />
                            )}
                        </button>

                        
                        
                    </div>
            </div>
        </div>
    </section>
    
  );
}
