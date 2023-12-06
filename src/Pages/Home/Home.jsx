import CategoryItems from "../../Components/CategoryItems/CategoryItems";
import Offer from "../../Components/Offer/Offer";


const Home = () => {
    return (
        <div>
            {/* offer items */}
            <Offer></Offer>
            {/* category item */}
            <CategoryItems></CategoryItems>

        </div>
    );
};

export default Home;