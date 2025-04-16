import { createBrowserRouter } from "react-router-dom";

import { Layout } from './components/layout';
import { Cart } from "./pages/cart";
import { DetailProduct } from "./pages/detail";
import { Favorites } from './pages/favorites';
import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/detail/:id',
                element: <DetailProduct />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/favorites',
                element: <Favorites />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    } 
]);

export { router };

