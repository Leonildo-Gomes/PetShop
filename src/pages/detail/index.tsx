
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidCartAdd } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { CartContext } from '../../context/CartContext';
import { db } from '../../services/firebaseConnection';
import { ProductProps } from '../home';
export function DetailProduct() { 
    const  { id } = useParams(); 
    const [product, setProduct] = useState<ProductProps> ();
    const [loading, setLoading] = useState<boolean> (true);
    const  {  addToCart}= useContext(CartContext);
    const colectionName: string='products';

    useEffect(()=>{ 
        async function loadProduct() {
            const docRef= doc(db, colectionName, id!); 
            getDoc(docRef)
            .then ((doc) => {
                if(doc.exists()) {
                    setProduct(doc.data() as ProductProps); 
                }
            }).catch((error) => {     
                toast.error("Impossivel carregar produto!! ERRO: "+ error);      
            }).finally(() => {
                setLoading(false); 
            }); 
            /*try {
                const response= await api.get(`/products/${id}`); 
                setProduct(response.data);
            } catch (error) {
                toast.error('Impossivel carregar produto!  ERRO:' + error);  
                console.log(error);
                setTimeout(() => {
                    setLoading(false); 
                }, 5000);
            }finally {
                 setLoading(false); 
            } */
        }
        loadProduct(); 
     } , [id]) 
     function handleAddToCart(product: ProductProps) {
        addToCart(product); 
        toast.success('Produto adicionado ao carrinho');
    }

    if(loading) { 
        return <Loading/>;
    
    }
    if (!product) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Producto nao encontrado</h2>
              <Link to="/" className="mt-4 text-teal-600 hover:text-teal-700">
                Ir para Pagina Principal
              </Link>
            </div>
          </div>
        );
      }
    
    return ( 
        <main className='w-full  max-w-5xl  mx-auto px-4 sm:px-6 lg:px-8 py-12'>

            { /* Btn voltar */ }
            <Link to={'/'} className='inline-flex items-center text-teal-600 hover:text-teal-700 mb-8'>
                <FaArrowLeft className="h-5 w-5 mr-2"/>
                Voltar
            </Link>
            { /* Detail Product */ }
            { product && (
                <div className='rounded-lg shadow-lg overflow-hidden bg-white '>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                { /* Img Product */ }
                    <div className='relative'>
                        <img  className='w-full  object-cover'
                            src= {product?.cover} alt={ product?.title}
                        />
                    </div>
                
                { /* Tilte Product */ }
                <div className='p-8'>
                    <div className='flex items-center justify-between mb-4 '>
                        <h1 className='text-3xl font-bold text-gray-900'>
                            {product?.title} 
                        </h1>
                        <span className='items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium'>
                            {product?.category}
                        </span>
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">(50 reviews)</span>
                    </div>
                    <p className="text-3xl font-bold text-teal-600 mb-6">
                        {product?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                    </p>
                    { /* Description Product */ }
                    <div className='prose prose-sm text-gray-500 mb-8'>
                        <p>
                            {product?.description}
                        </p>
                    </div>
                    <button onClick={()=>handleAddToCart(product)}
                        className='w-full flex items-center justify-center bg-teal-600 text-white
                            py-4 rounded-full hover:bg-teal-700 transition-colors text-lg font-semibold mt-4'>
                        <BiSolidCartAdd className="h-6 w-6 mr-2"/>
                        Adicionar ao Carrinho
                    </button>

                </div>
                </div>
                
            </div>
            ) }
            



        </main>
    )
} 