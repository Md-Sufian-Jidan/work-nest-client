import Banner from "../banner/banner";
import OurTeam from "../OurTeam/OurTeam";
import Services from "../services/Services";
import Testimonials from "../testimonials/Testimonials";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <Testimonials />
            <OurTeam />
            <WhyChooseUs />
        </div>
    );
};

export default Home;