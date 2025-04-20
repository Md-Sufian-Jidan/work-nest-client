import Banner from "../banner/banner";
import OurTeam from "../OurTeam/OurTeam";
import Services from "../services/Services";
import Testimonials from "../testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <Testimonials />
            <OurTeam />
        </div>
    );
};

export default Home;