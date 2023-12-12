import { CiLock } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const {signInWithGoogle}=useAuth();
    const axiosPublic=useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const { signIn } = useAuth();
  
    const handleLogIn = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value || "Not given";
      const password = form.password.value || "Not given";
  
      signIn(email, password)
        .then(res => {
          const loggedUser = res.user;
          console.log(loggedUser)
          Swal.fire("Login successfully");
          navigate(from, { replace: true });
        })
        .catch(error => {
          Swal.fire(`${error}`);
        });
    }

    const handleGoogleSignIn=()=>{
       signInWithGoogle()
       .then(res=>{

        const userInfo={
            email:res.user.email,
            name:res.user.displayName
        }

        axiosPublic.post('/users',userInfo)
        .then((res)=>{
            console.log(res.data);
                Swal.fire('Hola you are here!')
                navigate('/')
            
        })
       }
       )
       .catch(error=>{
        console.log('Error is :--',error);
       })

    }

    return (
        <div className="bg-cover min-h-screen p-6 pb-10 mt-10"  style={{ backgroundImage: `url(https://i.ibb.co/9Y1SFyT/yellow-sports-shoe-with-elegant-design-generated-by-ai.jpg)` }}>
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/30 items-center text-center p-6 md:p-20 mt-10">
                <div className="">
                    <h1 className="text-2xl text-black font-bold md:text-4xl font-serif mb-2">Log in to Account</h1>
                    <p className="text-sm font-serif mb-6 text-black">Welcome back! Select methood to log in.</p>

                    <form className="max-w-sm mx-auto" onSubmit={handleLogIn}>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <MdOutlineMail className="text-xl"></MdOutlineMail>
                            </div>
                            <input type="email" id="email-address-icon" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-black  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <CiLock className="text-xl"></CiLock>
                            </div>
                            <input type="password" id="password-icon" className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                        </div>
                        <IoEyeOutline className=" relative left-[300px] md:left-[350px] bottom-7 lg:left-[360px] "></IoEyeOutline>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex md:mt-6 mb-2 md:mb-6 items-center">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                </div>
                                <label htmlFor="remember" className="ms-[2px] text-sm font-medium text-gray-900 dark:text-gray-300 font-serif"> Remember me</label>
                            </div>
                            <h1 className="text-sm  text-start font-serif text-[#1e429f] ">Forgate password?</h1>
                        </div>
                        <button type="button" className="text-white bg-[#fe3c13] hover:bg-[#fe3c13] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-6 font-serif me-2 mb-2 ">Log in</button>
                    </form>
                    <div className="mt-">
                        <h1 className="text-base font-serif">Do not have account? <Link to={'/signup'}>
                            <span className="text-base font-serif text-blue-600">Create an account</span>
                        </Link>
                        </h1>
                    </div>

                    <div>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-72 h-px my-8 bg-gray-200  border-0 dark:bg-gray-700"></hr>
                            <span className="absolute px-3 font-medium text-black -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900 text-lg font-serif">or continue with</span>
                        </div>
                        <div className="flex justify-center items-center gap-2 md:gap-4">
                            <button type="button" className="py-2 px-4 md:px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"  onClick={handleGoogleSignIn}>

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
    );
};

export default Login;