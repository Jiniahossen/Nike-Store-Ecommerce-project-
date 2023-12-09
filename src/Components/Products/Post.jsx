import useProducts from "../../hooks/useProducts";
import Container from "../Shared/Container/Container";
import SinglePost from "./SinglePost";

const Post = () => {
    const [shoe] = useProducts([]);
    console.log(shoe);

    return (
        <Container>
            <div className="flex  mt-20">
                <div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        shoe.map(item => <SinglePost key={item._id} item={item}></SinglePost>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default Post;