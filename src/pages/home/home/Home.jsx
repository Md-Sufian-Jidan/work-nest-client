import { Helmet } from "react-helmet";
import Banner from "../banner/banner";
import Services from "../services/Services";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>WorkNest | Home</title>
            </Helmet>
            <Banner />
            <Services />
        </div>
    );
};

export default Home;