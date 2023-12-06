import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="mt-20">
            <footer className="bg-white rounded-lg  dark:bg-gray-900 m-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-serif">Food Garden</span>
                        </a>
                        <ul className="flex gap-4 font-serif text-black flex-wrap items-center mb-6 text-lg font-medium  sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link to={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/about'}>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm font-serif sm:text-center text-black">© 2023 <a href="https://flowbite.com/" className="hover:underline">Food Garden™</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </div>
    );
};

export default Footer;