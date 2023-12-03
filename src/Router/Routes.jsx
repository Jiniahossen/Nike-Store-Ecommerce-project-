import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Home from "../Pages/Home/Home";


const Routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Main></Main>,
            children:
                [
                    {
                        index: true,
                        element:<Home></Home>
                    },
                    
                    {
                        path:'/login',
                        element:<Login></Login>
                    },
                    {
                        path:'/signup',
                        element:<Signup></Signup>
                    }
                ]
        }
    ])

export default Routes;