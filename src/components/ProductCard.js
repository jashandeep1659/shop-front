import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, price, image, slug }) => {
    return (
        <section
            id="ProductCard"
            className="shadow-xl rounded md:m-3 m-1 py-5 px-2 border "
        >
            <Link to={`/product/${slug}`}>
                <div className="image">
                    <img src={image} />
                </div>
                <div className="text">
                    <p className="text-lg font-medium">{name}</p>
                    <p className="text-sm">${price}</p>
                </div>
            </Link>
        </section>
    );
};

export default ProductCard;
