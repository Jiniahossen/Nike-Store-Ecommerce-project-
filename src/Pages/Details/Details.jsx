import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import Container from '../../Components/Shared/Container/Container';
import useProducts from '../../hooks/useProducts';

const Details = () => {
    // Fetching products using custom hook
    const [shoe] = useProducts([]);

    // Extracting the ID parameter from the route
    const { id } = useParams();

    // Finding the selected data based on the ID
    const selectedData = shoe.find((data) => data._id === id);

    // State to manage the selected image
    const [selectedImage, setSelectedImage] = useState(selectedData?.images[0]?.img);

    // State to manage the selected size
    const [selectedSize, setSelectedSize] = useState(null);

    // State to manage the selected color
    const [selectedColor, setSelectedColor] = useState(selectedData?.Colors[0]?.name);

    // Handle click on a side image
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Handle click on a size option
    const handleSizeClick = (size) => {
        setSelectedSize((prevSize) => (prevSize === size ? null : size));
    };

    // Handle click on a color option
    const handleColorClick = (color) => {
        // If the clicked color is already selected, unselect it
        if (selectedColor === color.name) {
            setSelectedColor(null);
            setSelectedImage(selectedData.images[0]?.img); // Reset the selected image to default
        } else {
            // Update the selected color
            setSelectedColor(color.name);

            // Find the corresponding image for the selected color
            const selectedColorImage = selectedData.images.find((img) => img.color === color.name);

            // Set the selected image based on the color
            setSelectedImage(selectedColorImage ? selectedColorImage.img : selectedData.images[0]?.img);
        }
    };

    // JSX structure for rendering the details page
    return (
        <div className="my-20">
            <Container>
                <div>
                    {/* Back button */}
                    <div className="mb-10">
                        <Link to={'/products'}>
                            <div className="w-12 mt-2 h-12 text-center rounded-full border border-black bg-white flex items-center">
                                <FaArrowLeftLong className="text-center ps-2 text-3xl items-center"></FaArrowLeftLong>
                            </div>
                        </Link>
                    </div>

                    {/* Image and details section */}
                    <div className="flex gap-14">
                        {/* Side images */}
                        <div className="flex gap-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-4">
                                    {selectedData?.images && selectedData.images?.map((imageObj, index) => (
                                        <img
                                            key={index}
                                            src={imageObj.img}
                                            alt={imageObj.color}
                                            className="h-20 cursor-pointer"
                                            onClick={() => handleImageClick(imageObj.img)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Main image section */}
                            <div className="h-96 w-[450px]">
                                <img src={selectedImage} alt="" className="h-[500px] w-[450px]" />
                            </div>
                        </div>

                        {/* Details section */}
                        <div>
                            {/* Product details */}
                            <h1 className="text-3xl font-serif font-semibold">{selectedData?.title}</h1>
                            <h1 className="font-serif text-lg font-medium my-2">{selectedData?.category}</h1>
                            <h1 className="text-base font-serif font-semibold">USD:${selectedData?.price}</h1>

                            {/* Size options */}
                            <div className="mt-14">
                                <h1 className="font-serif text-xl font-semibold">Select size:</h1>
                                <div className="grid grid-cols-3 gap-4 mt-4 font-serif">
                                    {selectedData?.sizes && selectedData?.sizes?.map((size, index) => (
                                        <span
                                            key={index}
                                            className={`mr-2 border px-2 py-1 cursor-pointer ${selectedSize === size ? 'bg-gray-300' : ''
                                                }`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Color options */}
                            <div className="mt-14">
                                <h1 className="font-serif text-xl font-semibold">Select color:</h1>
                                <div className="grid grid-cols-5 gap-2">
                                    {selectedData?.Colors && selectedData?.Colors?.map((color, index) => (
                                        <div key={index} className="flex-row">
                                            <div
                                                className={`w-8 mt-2 h-8 rounded-full border border-black ${selectedColor === color.name ? 'bg-gray-600' : 'bg-gray-400'
                                                    }`}
                                                style={{ backgroundColor: color.code }}
                                                onClick={() => handleColorClick(color)}
                                            >
                                                {selectedColor === color?.name && <FaCheck className="text-orange-900 text-center " />}
                                            </div>
                                            <h1>{color.name}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-10">
                                <button
                                    type="button"
                                    className="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-black focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl font-serif text-lg px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white hover:text-white  dark:hover:bg-black dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                >
                                    Add to cart
                                </button>

                                <button
                                    type="button"
                                    className="text-white w-full flex items-center justify-center text-center bg-black rounded-2xl font-serif font-medium text-lg px-5 py-1 me-2 mb-2"
                                >
                                    <h1 className="text-base flex-grow text-center">Add to wishlist</h1>
                                    <MdFavoriteBorder className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional product information */}
                <div>
                    {selectedData?.short_description}
                </div>
            </Container>
        </div>
    );
};

export default Details;
