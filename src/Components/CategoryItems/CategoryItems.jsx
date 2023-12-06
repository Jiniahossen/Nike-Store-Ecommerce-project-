import { useEffect, useState } from "react";
import Container from "../Shared/Container/Container";

const CategoryItems = () => {


    const [offer, setOffer] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setOffer(data);
            });
    }, []);



    return (
        <div className="mt-20">
            <Container>
                {/* search input */}
                <h1 className="text-3xl mb-4 font-bold font-serif text-center">Menu</h1>
                <div className="max-w-2xl mx-auto">
                    <form className="flex items-center">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="voice-search" className="bg-gray-50 border py-4  border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chicken , Roast Beef..." required />
                            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">

                                {/* Mic svg */}
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                {/* category items */}

                <div className="mt-10">
                    <h1 className="text-2xl font-serif mb-4">Menu</h1>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {offer.map(item => (
                            <div key={item._id} className="rounded-lg h-[150px] bg-cover" style={{ backgroundImage: `url(${item.category_img})` }}>

                                <div className=" h-[50px] md:h-[40px] backdrop-blur-[2px] bg-white/50  mt-[60px] md:mt-[60px] flex  justify-center items-center">
                                    <h1 className="text-lg font-serif text-black text-center">{item.category_name}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10">
                    <h1 className="text-2xl font-serif mb-4">Menu</h1>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {offer.map(item => (
                            <div key={item._id} className="rounded-lg h-[150px] bg-cover" style={{ backgroundImage: `url(${item.category_img})` }}>

                                <div className=" h-[50px] md:h-[40px] backdrop-blur-[2px] bg-white/50  mt-[60px] md:mt-[60px] flex  justify-center items-center">
                                    <h1 className="text-lg font-serif text-black text-center">{item.category_name}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-10">
                    <h1 className="text-2xl font-serif mb-4">Menu</h1>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {offer.map(item => (
                            <div key={item._id} className="rounded-lg h-[150px] bg-cover" style={{ backgroundImage: `url(${item.category_img})` }}>

                                <div className=" h-[50px] md:h-[40px] backdrop-blur-[2px] bg-white/50  mt-[60px] md:mt-[60px] flex  justify-center items-center">
                                    <h1 className="text-lg font-serif text-black text-center">{item.category_name}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              
                
            </Container>

        </div>
    );
};

export default CategoryItems;