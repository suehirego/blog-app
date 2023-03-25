import React from 'react';
import './style.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import SinglePage from './pages/SinglePage';
import Footer from './components/Footer';
import Exercise from './pages/Exercise';
import Meals from './pages/Meals';
import Navbar from './components/Navbar';

//MAIN LAYOUT for home,Write & Single pages
const Layout = () => {
    return (
        <div>
           <Navbar/>
           <Outlet/>
           <Footer/>
        </div>
    )
};

const router = createBrowserRouter([
   {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/write",
                element:<Write/>
            },
            {
                path:"/posts/:id",
                element:<SinglePage/>
            },
            {
                path:"/exercise",
                element:<Exercise/>
            },
            {
                path:"/meals",
                element:<Meals/>
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])


function App() {

    return (
        <div className='app'>
            <div className='container' id="container">
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App