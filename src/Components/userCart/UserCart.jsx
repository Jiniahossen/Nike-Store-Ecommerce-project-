import useUserCart from "../../hooks/useUserCart";


const UserCart = () => {

    const [userCart,refetch]=useUserCart([]);
    console.log(userCart);
    return (
        <div>
            
        </div>
    );
};

export default UserCart;