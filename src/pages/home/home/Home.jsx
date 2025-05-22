import { Helmet } from "react-helmet";
import Banner from "../banner/banner";
import OurTeam from "../OurTeam/OurTeam";
import Services from "../services/Services";
import Testimonials from "../testimonials/Testimonials";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";
import FeaturedTools from "../FeaturedTools/FeaturedTools";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>WorkNest | Home</title>
            </Helmet>
            <Banner />
            <WhyChooseUs />
            <FeaturedTools />
            <Services />
            <Testimonials />
            <OurTeam />
        </div>
    );
};

export default Home;