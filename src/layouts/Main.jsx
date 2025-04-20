import { Helmet } from "react-helmet";
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/footer/Footer';

const Main = () => {
    return (
        <div>
            <Helmet>
                <title>WorkNest | Home</title>
            </Helmet>
            <div className='h-20'>
                <Navbar />
            </div>
            <div className='min-h-[calc(100vh-310px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;