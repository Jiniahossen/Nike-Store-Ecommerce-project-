import { Link, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { FaArrowLeftLong } from "react-icons/fa6";
import Container from "../../Components/Shared/Container/Container";
import { useState } from "react";

const Details = () => {

    const [shoe] = useProducts([]);
    const { id } = useParams();
    const selectedData = shoe.find(data => data._id === id);
    const [selectedImage, setSelectedImage] = useState(selectedData.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="my-20">
            <Container>
                <div>
                    <div className="mb-10">
                        <Link to={'/products'}>
                            <div className="w-12 mt-2 h-12 text-center rounded-full border border-black bg-white flex items-center">
                                <FaArrowLeftLong className="text-center ps-2 text-3xl items-center"></FaArrowLeftLong>
                            </div>
                        </Link>
                    </div>
                    <div>
                        {/* Imag part */}
                    <div className="flex gap-4">
                        
                        {/* side images */}
                        <div  className="flex flex-col gap-4">
                            {selectedData.images.slice(0).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt=""
                                    className="h-20 cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                        {/* main image section */}
                        <div className="h-96">
                            <img src={selectedImage} alt="" className="h-[500px]" />
                        </div>

                    </div>

                    {/* Deatisl part */}

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Details;