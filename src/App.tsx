//import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import CartProvider from './context/CartContext';
import FavotiteProvider from './context/FavoritesContext';

function App() {
 // const [count, setCount] = useState(0)

  return (
    <CartProvider>
      <FavotiteProvider> 
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <RouterProvider router={router} />
      </FavotiteProvider> 
    </CartProvider>
  )
}

export default App
