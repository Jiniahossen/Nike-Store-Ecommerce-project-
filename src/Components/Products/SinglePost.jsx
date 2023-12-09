import React from 'react';
import { Link } from 'react-router-dom';

const SinglePost = ({ item }) => {
    console.log(item);

    return (
        <div className="relative">
            <Link to={`/details/${item._id}`}>
                <div className="group">
                    <img src={item.images[0]} alt="" className="h-72 w-full transition-transform duration-300 transform hover:scale-105" />
                    <img src={item.images[1]} alt="" className="h-72 w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-105" />
                </div>

                <h1 className="text-lg font-serif mt-4 mb-1">{item.title}</h1>
                <h1 className="text-base font-serif text-gray-400">{item.colors.length} colors</h1>
                <h1 className="text-lg font-semibold font-serif my-1">${item.price}</h1>
            </Link>
        </div>
    );
};

export default SinglePost;
