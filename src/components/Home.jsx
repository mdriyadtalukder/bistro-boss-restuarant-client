import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Featured from "./Featured";
import PopularItems from "./PopularItems";
import Swiiper from "./Swiiper";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restuarant</title>
            </Helmet>
            <Banner></Banner>
            <Swiiper></Swiiper>
            <PopularItems></PopularItems>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;