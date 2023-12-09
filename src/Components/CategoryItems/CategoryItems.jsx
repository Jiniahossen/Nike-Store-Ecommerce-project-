import CategorySlide from "../Slider/CategorySlide"
import Container from "../Shared/Container/Container";

const CategoryItems = () => {



    return (
        <div className="mt-20">
            <Container>
                {/* search input */}
                <h1 className="text-3xl mb-4 font-bold font-serif text-start">Category</h1>

                {/* category items */}

               <CategorySlide></CategorySlide>
                
                
              
                
            </Container>

        </div>
    );
};

export default CategoryItems;