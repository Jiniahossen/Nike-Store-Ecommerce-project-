import { CiLock } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { Link } from "react-router-dom";

const Signup = () => {

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value || "Not given";
        const image = form.image.value || "Not given";
        const email = form.email.value || "Not given";
        const password = form.password.value || "Not given";

        const info={
            name,
            image,
            email,
            password
        }
        console.log(info);

    }






    return (
        <div>
            <div className="bg-cover min-h-screen p-6 pb-10 mt-10" style={{ backgroundImage: `url(https://i.ibb.co/9Y1SFyT/yellow-sports-shoe-with-elegant-design-generated-by-ai.jpg)` }}>
                <div className="max-w-5xl mx-auto backdrop-blur-sm bg-white/30 items-center text-center p-6 md:p-20 mt-10">
                    <h1 className="text-2xl md:text-4xl font-serif font-bold mb-2 text-black">Create an Account</h1>
                    <p className="text-sm font-serif mb-6 text-black">Stay with FoodGarden</p>
                    <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <FaRegUserCircle className="text-xl"></FaRegUserCircle>
                            </div>
                            <input type="test"  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user Name" name="name" />
                        </div>
                        <div className="relative mb-4">
                        <label className="block text-start font-serif text-black mb-2 text-base font-medium  dark:text-black" htmlFor="multiple_files">Upload Image:</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" required name="image" />
                        </div>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <MdOutlineMail className="text-xl"></MdOutlineMail>
                            </div>
                            <input type="email" id="email-address-icon" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" name="email" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg> */}
                                <CiLock className="text-xl"></CiLock>

                            </div>
                            <input type="password" id="password-icon" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" name="password" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-6 font-serif me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button>
                    </form>
                    <div className="mt-">
                        <h1 className="text-base font-serif">Already have an account? <Link to={'/login'}>
                            <span className="text-base font-serif text-blue-700">Login</span>
                        </Link>
                        </h1>
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-72 h-px my-8 bg-gray-200  border-0 dark:bg-gray-700"></hr>
                            <span className="absolute px-3 font-medium text-black -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 text-lg font-serif">or continue with</span>
                        </div>
                        <div>
                            <div>
                                <div className="flex justify-center items-center gap-2 md:gap-4">
                                    <button type="button" className="py-2 px-4 md:px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">

                                        <div className="flex items-center gap-2 text-lg font-serif">
                                            <h1>Google</h1>
                                            <FcGoogle className="text-2xl"></FcGoogle>
                                        </div>
                                    </button>
                                    <button type="button" className="py-2 px-4 md:px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">

                                        <div className="flex items-center gap-2 text-lg font-serif">
                                            <h1>Facebook</h1>
                                            <CiFacebook className="text-2xl text-blue-700"></CiFacebook>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default Signup;