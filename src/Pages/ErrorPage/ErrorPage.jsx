import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="mt-20 h-fit">

            <div className='flex justify-center max-w-lg mx-auto'>
                <img src="https://i.ibb.co/fqNMsGd/5203172-removebg-preview.png" className="w-full" alt="" />
            </div>
            <div className='flex justify-center mt-6'>
                <Link to={'/'}>
                    <button className="text-lg rounded-md  font-serif px-4 py-2 text-white bg-[#fe3c13]">Return Home</button>
                    </Link>
            </div>

        </div>
    );
};

export default ErrorPage;