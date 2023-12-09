import { Link, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import Container from "../../Components/Shared/Container/Container";
import { useState } from "react";

const Details = () => {

    const [shoe] = useProducts([]);
    const { id } = useParams();
    const selectedData = shoe.find(data => data._id === id);
    const [selectedImage, setSelectedImage] = useState(selectedData.images[0]);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleSizeClick = (size) => {
        setSelectedSize((prevSize) => (prevSize === size ? null : size));
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
                    <div className="flex gap-14">
                        {/* Imag part */}
                        <div className="flex gap-4">

                            {/* side images */}
                            <div className="flex flex-col gap-4">
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

                        <div>
                            {/* title */}
                            <h1 className="text-3xl font-serif font-semibold">{selectedData.title}</h1>
                            {/* category */}
                            <h1 className="font-serif text-lg font-medium my-2">{selectedData.category}</h1>
                            {/* price */}
                            <h1 className="text-base font-serif font-semibold">USD:${selectedData.price}</h1>

                            {/* sizes */}
                            <div className="mt-14">
                                <h1 className="font-serif text-xl font-semibold">Select size:</h1>
                                <div className="grid grid-cols-3 gap-4 mt-4 font-serif">
                                    {selectedData.sizes.map((size, index) => (
                                        <span
                                            key={index}
                                            className={`mr-2 border px-2 py-1 cursor-pointer ${selectedSize === size ? "bg-gray-300" : ""
                                                }`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* button */}

                            <div className="mt-10">
                                <button type="button" className="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-black focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl font-serif text-lg px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white hover:text-white  dark:hover:bg-black dark:hover:border-gray-600 dark:focus:ring-gray-700">Add to cart</button>

                                <button type="button" className="text-white w-full flex items-center  gap-2 text-center bg-black hover:bg-gray-900 focus:outline-none  rounded-2xl focus:ring-4  font-serif focus:ring-gray-300 font-medium text-lg  px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                    <h1>Add to wishlist</h1>
                                    <MdFavoriteBorder className="text-2xl"></MdFavoriteBorder>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Details;