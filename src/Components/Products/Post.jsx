import { Helmet } from "react-helmet-async";
import useProducts from "../../hooks/useProducts";
import Container from "../Shared/Container/Container";
import SinglePost from "./SinglePost";

const colors = [
    { code: "#fff", name: "White" },
    { code: "#ea3323", name: "Red" },
    { code: "#00c49f", name: "Green" },
    { code: "#000000", name: "Black" },
    { code: "#f79bcb", name: "Pink" },
    { code: "e8e8e8", name: "Gray" },
    { code: "#f6d804", name: "Yellow" },
    { code: "#6bcaeb", name: "Blue" },
    { code: "#FFA500", name: "Orange" },
    { code: "#30D5C8", name: "Turquoise" }
];

const categories = ["Running", "Lifestyle"];

const priceRanges = ["$0-50", "$50-100", "$100-150"];

const Post = () => {
    const [shoe] = useProducts([]);
   
  

    return (
        <Container>
            <Helmet>
                <title>CrossCountry | Products</title>
            </Helmet>
            <div className="flex my-20 gap-10 md:p-10 lg:p-0 min-h-screen">
                <div className="overflow-y-auto overflow-x-auto">
                    <div className="text-lg font-serif mb-6">
                        <h1 className="text-xl font-serif font-semibold mb-2">
                           Title:
                        </h1>
                        {shoe.map((item) => (
                            <div key={item._id}>
                                <input
                                    id={`title-checkbox-${item._id}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`title-checkbox-${item._id}`}
                                    className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {item.title}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Sort by color */}
                
                    <div className="my-6">
                        <h1 className="text-xl font-serif font-semibold mb-2">
                            Color:
                        </h1>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map((color, index) => (
                                <div key={index} className="flex-row">
                                    <div
                                        key={index}
                                        className="w-8 mt-2 h-8 rounded-full border border-black bg-gray-400"
                                        style={{ backgroundColor: color.code }}
                                    >
                                    </div>
                                    <h1>{color.name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sort by category */}
                    <div className="text-lg font-serif my-6">
                        <h1 className="text-xl font-serif font-semibold mb-2">
                           Category:
                        </h1>
                        {categories.map((category, index) => (
                            <div key={index}>
                                <input
                                    id={`category-checkbox-${index}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`category-checkbox-${index}`}
                                    className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Sort by price */}
                    <div className="text-lg font-serif my-6">
                        <h1 className="text-xl font-serif font-semibold mb-2">
                            Price range:
                        </h1>
                        {priceRanges.map((price, index) => (
                            <div key={index}>
                                <input
                                    id={`price-checkbox-${index}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`price-checkbox-${index}`}
                                    className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {price}
                                </label>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Post */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {shoe.map((item) => (
                        <SinglePost key={item._id} item={item}></SinglePost>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Post;
