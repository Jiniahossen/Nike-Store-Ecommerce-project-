import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { IoLocation } from "react-icons/io5";

const Profile = () => {
    return (
        <Container>
            <div>
                <div className="flex items-center gap-4 mt-6 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <Link to={'/login'}>
                            <img className="w-12 h-12 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </Link>
                    </button>
                    <div>
                        <h1>Name</h1>
                        <div className="flex gap-2 items-center ">
                            <IoLocation className="text-lg"></IoLocation>
                            <p>Address:</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Profile;