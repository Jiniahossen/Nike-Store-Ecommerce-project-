import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import Container from '../../Components/Shared/Container/Container';
import useProducts from '../../hooks/useProducts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
    const [selectedColor, setSelectedColor] = useState(null);

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
                    <div className="flex gap-14 ">
                        {/* Side images */}
                        <div className="flex gap-4 flex-1">
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
                        <div className='flex-1'>
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
                <div className='my-14 h-[400px] overflow-y-auto'>
                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Reviews</Tab>
                        </TabList>
                        <TabPanel>
                            <h2 className='font-serif text-lg'>{selectedData?.short_description}</h2>
                        </TabPanel>
                        <TabPanel>
                            <div className='flex justify-center'>
                                <div className='flex-1'>
                                    <h1 className='text-xl font-serif flex justify-center mb-6'>Left a review:</h1>
                                    <form className="max-w-sm mx-auto">
                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-serif">Your email</label>
                                            <input type="email" id="email" className="bg-gray-50 font-serif border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="name@flowbite.com" required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Review</label>
                                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                        </div>
                                        <button type="submit" className="text-white bg-[#fe3d13] focus:ring-4 focus:outline-none font-serif font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                                    </form>

                                </div>
                                <div className='flex-1 overflow-y-auto'>
                                    <h1 className='text-lg font-serif mb-6'> (Reviews)</h1>
                                    <div>
                                        <p>
                                            <article>
                                                <div className="flex items-center mb-4">
                                                    <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
                                                    <div className="font-medium dark:text-white">
                                                        <p>Jese Leos</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
                                                </div>
                                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p> <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
                                                <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
                                                <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
                                                <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                                            </article>

                                        </p>
                                        <p>
                                            <article>
                                                <div className="flex items-center mb-4">
                                                    <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
                                                    <div className="font-medium dark:text-white">
                                                        <p>Jese Leos</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
                                                </div>
                                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p> <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
                                                <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
                                                <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
                                                <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                                            </article>

                                        </p>
                                        <p>
                                            <article>
                                                <div className="flex items-center mb-4">
                                                    <img className="w-10 h-10 me-4 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
                                                    <div className="font-medium dark:text-white">
                                                        <p>Jese Leos</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                    <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
                                                </div>
                                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p> <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
                                                <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
                                                <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
                                                <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                                            </article>

                                        </p>
                                        
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>


                {/* related products */}
            </Container>
        </div>
    );
};

export default Details;
