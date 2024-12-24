import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import Suppliers from "./pages/suppliers/Suppliers";
import Supplier from "./pages/supplier/Supplier";


import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Categorys from "./pages/categorys/Categorys";
import Orders from "./pages/orders/Orders";



const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/orders",
          element: <Orders/>,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/suppliers",
          element: <Suppliers />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/categorys",
          element: <Categorys />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/supplier",
          element: <Supplier />,
        },
        {
          path: "/products/id",
          element: <Product />,
        },
       
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
