import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loading } from '../../components/loading';
import { ProductCart } from '../../components/productCart';
import { api } from '../../services/api';
export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    category: string;

}
const categories = ["All", "Food", "Accessories", "Travel"];
export function Home() { 
    const [products , setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory , setSelectedCategory ] = useState<string> ('All');
    
    
    
    useEffect(() => { 
        async function loadProducts() {
            const response= await api.get('/products');
            if(response.status !== 200) {
                toast.error("Impossivel carregar produtos");
                return
            }   
            setProducts(response.data);  
            setLoading(false); 
        }
        loadProducts(); 
    }, [])  
    
    const filteredProducts = selectedCategory === "All" 
            ? products : products.filter(product => product.category === selectedCategory); 
    if (loading) {
      return  <Loading/> ;
    }
    return ( 
        <div>
            <main className="w-full  max-w-7xl  mx-auto px-4">
                {/* Category Filters */}
                <div className='mb-8 '>
                    <div className='flex flex-wrap justify-center gap-4 py-4'>
                        {categories.map((category) => (
                             <button key={category} onClick={() => setSelectedCategory(category)} 
                                    className={`px-6 py-2 rounded-full font-medium transition-colors
                             ${selectedCategory === category ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 '} shadow-sm`}>
                                 {category}
                             </button>
                        ))}

                    </div>

                </div>
                <h1 className="text-2xl font-bold text-center mt-10 mb-5 text-gray-600">Produtos mais Vendidos</h1>
                <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                    { filteredProducts.map((item)=> 
                        ProductCart({product: item}) 
                    ) }
                </div>
        </main>
        </div>
        
    )
} 