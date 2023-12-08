import CategoryItems from "../../Components/CategoryItems/CategoryItems";
import Slider from "../../Components/Slider/Slider";


const Home = () => {
    return (
        <div>
            {/* offer items */}
            <Slider></Slider>
            
            {/* category item */}
            <CategoryItems></CategoryItems>

        </div>
    );
};

export default Home;