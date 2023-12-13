import useWishlist from '../../hooks/useWishlist'
import { Helmet } from "react-helmet-async";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Wishlists = () => {

    const [wishlist, wishlistRefetch] = useWishlist();
    console.log(wishlist);
    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>CrossCountry | Cart</title>
            </Helmet>
            <div className="mt-20 mb-10 overflow-x-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {
                        wishlist?.length > 0 ? (<table className="w-full text-sm text-left rtl:text-right text-black  dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-[#fe3c13] dark:bg-gray-700 dark:text-gray-400 font-serif">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Remove
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    wishlist?.map((item) =>
                                        <>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-serif">
                                                <td className="p-4">
                                                    <img src={item.selectedImage} className="w-20 rounded-md h-20" alt="Apple Watch" />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span className="sr-only">Quantity button</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <div>
                                                            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" value={item.quantity} required />
                                                        </div>
                                                        <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                            <span className="sr-only">Quantity button</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    ${item.price}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.selectedColor}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.selectedSize}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleDelete(item._id)}>
                                                        <CiCircleRemove className="text-3xl text-red-700"></CiCircleRemove>
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2 items-center mt-6">
                                                    <button className="bg-green-500 text-white px-2 py-1" onClick={() => handleDelete(item._id)}>
                                                        Add to cart
                                                    </button>
                                                    <button className="bg-green-500 text-white px-2 py-1" onClick={() => handleDelete(item._id)}>
                                                        Buy
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }

                            </tbody >
                        </table>) : (
                            <div>
                                <div className='flex justify-center'>
                                    <img src="https://i.ibb.co/mRgN7zy/no-wish-list.png" alt="" />
                                </div>
                                <div className='flex justify-center'>
                                    <Link to={'/products'}>
                                        <button className='px-3 py-2 rounded-md text-white font-serif bg-[#fe3c13]'>Shop Now</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Wishlists;