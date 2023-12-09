import { Helmet } from "react-helmet-async";
// import CategoryItems from "../../Components/CategoryItems/CategoryItems";
import Slider from "../../Components/Slider/Slider";


const Home = () => {
    return (
        <div >
            <Helmet>
                <title>CrossCountry | Home</title>
            </Helmet>
            {/* offer items */}
            <Slider></Slider>
            {/* category item */}
            {/* <CategoryItems></CategoryItems> */}

            {/* products section */}
               
            

        </div>
    );
};

export default Home;