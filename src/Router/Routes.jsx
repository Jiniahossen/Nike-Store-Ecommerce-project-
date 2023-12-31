import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Home from "../Pages/Home/Home";
import Wishlists from "../Pages/Wishlists/Wishlists";
import Dashboard from "../Layouts/Dashboard";
import Post from "../Components/Products/Post";
import Details from "../Pages/Details/Details";
import UserCart from "../Pages/userCart/UserCart";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


const Routes = createBrowserRouter(
    [
        {
            path: '/',
            errorElement: <ErrorPage></ErrorPage>,
            element: <Main></Main>,
            children:
                [
                    {
                        index: true,
                        element: <Home></Home>
                    },
                    {
                        path: '/wishlists',
                        element: <Wishlists></Wishlists>
                    },
                    {
                        path: '/cart',
                        element: <UserCart></UserCart>
                    },
                    {
                        path: '/products',
                        element: <Post></Post>
                    },
                    {
                        path: '/details/:id',
                        element: <Details></Details>
                    },

                    {
                        path: '/login',
                        element: <Login></Login>
                    },
                    {
                        path: '/signup',
                        element: <Signup></Signup>
                    }
                ]
        }
        ,
        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>
        }
    ])

export default Routes;