import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { MdFavoriteBorder } from 'react-icons/md';
import Container from '../../Components/Shared/Container/Container';
import useProducts from '../../hooks/useProducts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SinglePost from '../../Components/Products/SinglePost';
import './makeup.css'
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useUserCart from '../../hooks/useUserCart';
import useReviews from '../../hooks/useReviews';

const Details = () => {

    const axiosPublic = useAxiosPublic();
    // Fetching products using custom hook
    const [shoe] = useProducts([]);
    const [userCart] = useUserCart();
 
    // finding the ID parameter from the route
    const { id } = useParams();
    // Finding the selected data based on the ID
    const selectedData = shoe.find((data) => data._id === id);

    const [review, refetch] = useReviews([]);
    const selectedReview = review.some((data) => data.itemID===selectedData._id);


    //formate date
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    };

    // convert date formate 

    const isProductInCart = userCart.some(item => item.itemID === selectedData._id);




    //current user

    const { user } = useAuth();
    const userEmail = user?.email;
    const userName = user?.displayName;
    const profile = user?.photoURL;

    const [email, setEmail] = useState(userEmail);
    const [message, setMessage] = useState('');


    //for rating star
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

    //review submission
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            email: email,
            message: message,
            rating: rating,
            name: userName,
            img: profile,
            ItemID: selectedData._id,
            Date: new Date(),
        };

        axiosPublic.post('/reviews', formData)
            .then((res) => {
                refetch()
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "WOW!",
                        text: "Review posted",
                        icon: "success"
                    });
                }
            })

        // console.log(formData);
    };

    //rating function
    const handleChange = (e) => {
        setTotalStars(parseInt(e.target.value, 10));
    };

    //quantity button state
    const [count, setCount] = useState(1);

    //increment operation
    const increment = () => {
        setCount(count + 1);
        console.log('Incremented count:', count + 1);
    };

    //decremnet operations

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
            console.log('Decremented count:', count - 1);
        }
    };


    // Filter the selected data based on the ID
    const filteredData = shoe.filter((data) => data.category === selectedData.category);


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


    const handleAddToCart = () => {
        // Check if all required fields are selected
        if (!selectedSize || !selectedColor || !selectedImage) {
            alert('Please select size, color, and image before adding to cart');
            return;
        }

        // Convert price and count to floats
        const itemPrice = parseFloat(selectedData?.price);
        const itemCount = parseFloat(count);

        // Check if the conversion was successful
        if (isNaN(itemPrice) || isNaN(itemCount)) {
            alert('Invalid price or quantity');
            return;
        }

        // Calculate the total price based on quantity
        const totalPrice = itemPrice * itemCount;


        const selectedItem = {
            title: selectedData?.title,
            category: selectedData?.category,
            price: totalPrice,
            selectedImage: selectedImage,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
            quantity: itemCount,
            email: userEmail,
            itemID: selectedData._id,
        };

        // Make the API call to add the item to the cart
        axiosPublic.post('/cart', selectedItem)
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product added to the cart!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
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
                                <div className="grid grid-cols-3 gap-4 mt-4 font-serif text-center">
                                    {selectedData?.sizes && selectedData?.sizes?.map((size, index) => (
                                        <span
                                            key={index}
                                            className={`mr-2 border px-2 py-1 cursor-pointer ${selectedSize === size ? 'bg-gray-300' : ''
                                                }`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            <h1>{size}</h1>
                                            {/* <h1>{selectedData?.quantity && selectedData?.quantity?.map((,index))}</h1> */}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* options title */}
                            <div className='flex justify-between mt-10'>
                                <h1 className="font-serif  text-xl font-semibold">Select quantity:</h1>
                                <h1 className="font-serif  text-start text-xl font-semibold">Select color:</h1>
                            </div>

                            {/* Quantity button */}
                            <div className="mt-2 flex justify-between items-center ">
                                <div className="flex items-center">
                                    <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={decrement}>
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <div>
                                        <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={count} required />
                                    </div>
                                    <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={increment}>
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Color options */}
                                <div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {selectedData?.Colors && selectedData?.Colors?.map((color, index) => (
                                            <div key={index} className="flex-row">
                                                <div
                                                    className={`w-8 mt-2 h-8 rounded-full border border-black cursor-pointer ${selectedColor === color.name ? 'bg-gray-600' : 'bg-gray-400 cursor-pointer'
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
                            </div>

                            {/* Action buttons */}
                            <div className="mt-10">
                                <button
                                    type="button"
                                    className="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-black focus:ring-4 focus:ring-gray-200 font-medium rounded-2xl font-serif text-lg px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white hover:text-white  dark:hover:bg-black dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleAddToCart}
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
                <div className='my-14 overflow-y-auto font-serif'>
                    <Tabs>
                        <TabList>
                            <Tab>Details</Tab>
                            <Tab>Reviews</Tab>
                        </TabList>
                        <TabPanel>
                            <h2 className='font-serif text-lg'>{selectedData?.short_description}</h2>
                        </TabPanel>
                        <TabPanel>
                            <div className='flex justify-center h-[470px]'>
                                <div className='flex-1'>
                                    <h1 className='text-xl font-serif flex font-semibold justify-center mb-6'>Left a review:</h1>
                                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                                        {/* ratings */}
                                        <div>
                                            <div className="App">
                                                <h1 className='text-lg font-serif'>Star rating</h1>
                                                {[...Array(totalStars)].map((star, index) => {
                                                    const currentRating = index + 1;
                                                    return (
                                                        <label key={index}>
                                                            <input
                                                                key={star}
                                                                type="radio"
                                                                name="rating"
                                                                value={currentRating}
                                                                onChange={() => setRating(currentRating)}
                                                            />
                                                            <span
                                                                className="star"
                                                                style={{
                                                                    color:
                                                                        currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                                                }}
                                                                onMouseEnter={() => setHover(currentRating)}
                                                                onMouseLeave={() => setHover(null)}
                                                            >
                                                                &#9733;
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                                <br />
                                                <br />
                                                <p className='text-base font-serif'>Your rating is: {rating}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-serif">Your email</label>
                                            <input type="email" id="email" className="bg-gray-50 font-serif border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " value={userEmail} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                        {/* Review text */}
                                        <div className="mb-5">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Review</label>
                                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={message}
                                                onChange={(e) => setMessage(e.target.value)}></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className={`text-white ${isProductInCart ? "bg-[#fe3d13]" : "bg-gray-400"
                                                } focus:ring-4 focus:outline-none font-serif font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
                                            disabled={!isProductInCart}
                                        >
                                            Submit
                                        </button>
                                    </form>

                                </div>
                                <div className='flex-1 overflow-y-auto'>
                                    <h1 className='text-lg font-serif mb-6'> (Reviews <span className='text-red-700'>{selectedReview.length}</span>)</h1>
                                    <div>
                                        <div>
                                            <div>
                                                {
                                                    selectedReview?.length > 0 ? (selectedReview?.map((item) => (
                                                        <p key={item._id}>
                                                            <article>
                                                                <div className="flex items-center mb-4">
                                                                    <img className="w-10 h-10 me-4 rounded-full" src={item.img} alt="" />
                                                                    <div className="font-medium dark:text-white">
                                                                        <p>{item.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                                                    {[...Array(Number(item.rating))].map((_, index) => (
                                                                        <svg
                                                                            key={index}
                                                                            className="w-4 h-4 text-yellow-300"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 22 20"
                                                                        >
                                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                                <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                                                    <p>
                                                                        <time dateTime={item.Date}>{formatDate(item.Date)}</time>
                                                                    </p>
                                                                </footer>
                                                                <p className="mb-2 text-gray-500 dark:text-gray-400">{item.message}</p>
                                                            </article>
                                                        </p>
                                                    ))) : (
                                                        <p className='text-xl font-serif'>No reviews available for this product.</p>
                                                    )
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>


                {/* related products */}
                <div>
                    <hr className='w-full' />
                    <h1 className='text-xl font-serif my-6'>Related products:</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {filteredData?.map(data => (
                            <SinglePost key={data._id} item={data} />
                        ))}
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default Details;
