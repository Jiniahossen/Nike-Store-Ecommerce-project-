import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUserCart from "../../hooks/useUserCart";
import Container from "../Shared/Container/Container";
import { CiCircleRemove } from "react-icons/ci";
import { useEffect, useState } from "react";


const UserCart = () => {

    const [userCart, refetch] = useUserCart([]);
    const axiosPublic=useAxiosPublic();


    //handle quantity
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



    //calculate total amount
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Calculate total amount when userCart changes
        calculateTotalAmount();
    }, [userCart]);

    const calculateTotalAmount = () => {
        let total = 0;
        userCart.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotalAmount(total);
    };


    const formattedTotalAmount = totalAmount.toFixed(2);
    //delete operation

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) { 
                axiosPublic.delete(`/cart/${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
                                icon: "success"
                            });
                        } else {
                            console.error(res.data.message);
                            Swal.fire({
                                title: "Error",
                                text: "Failed to delete item.",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                    });
            }
        });
    };

    //update operation

    const handleQuantityChange = (id, newQuantity, newPrice) => {
        // Update the quantity and price in the database
        axiosPublic
            .put(`/cart/${id}`, { quantity: newQuantity, price: newPrice })
            .then((res) => {
                if (res.data.success) {
                    refetch();
                    calculateTotalAmount();
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error('Error updating quantity and price:', error);
            });
    };
    
    
    return (
        <Container>
            <div className="mt-20 mb-10 overflow-x-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-black  dark:text-gray-400">
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
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userCart?.map((item) =>
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
                                                    <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => {
                                                    const newQuantity = Math.max(item.quantity - 1, 0);
                                                    handleQuantityChange(item._id, newQuantity);
                                                }}>
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" value={item.quantity} required />
                                                    </div>
                                                    <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={() => {
                                                    const newQuantity = item.quantity + 1;
                                                    handleQuantityChange(item._id, newQuantity);
                                                }}>
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
                                               <button onClick={()=>handleDelete(item._id)}>
                                                 <CiCircleRemove className="text-3xl text-red-700"></CiCircleRemove>
                                               </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }

                        </tbody >
                    </table>
                </div>
                <div>
                    <button>

                    </button>
                </div>

            </div>

            <div className="mt-6 p-2 text-lg font-serif bg-gray-300 h-56 w-80" style={{ float: 'right' }}>
              <h1 className="mb-2">Total:${formattedTotalAmount}</h1>
              <hr className="mb-2"/>
              <h1 className="mb-2">Discount:$ <span>00</span></h1>
              <h1 className="mb-2">Subtotal:$ <span> {formattedTotalAmount}</span></h1>
               <button className="w-full mt-6 bg-[#fe3c13] py-1 text-white rounded-md">Checkkout</button>
            </div>
        </Container>
    );
};

export default UserCart;