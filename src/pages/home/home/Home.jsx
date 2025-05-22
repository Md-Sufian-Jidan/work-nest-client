import { Helmet } from "react-helmet";
import Banner from "../banner/banner";
import OurTeam from "../OurTeam/OurTeam";
import Services from "../services/Services";
import Testimonials from "../testimonials/Testimonials";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>WorkNest | Home</title>
            </Helmet>
            <Banner />
            <WhyChooseUs />
            <Services />
            <Testimonials />
            <OurTeam />
        </div>
    );
};

export default Home;