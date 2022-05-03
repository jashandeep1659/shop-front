import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/";
import ProductCard from "../components/ProductCard";

const BrandPage = () => {
    const [loading, setloading] = useState(true);
    const [productslist, setproductslist] = useState([]);
    const currentSlug = useParams();
    const [brandName, setbrandName] = useState(null);

    const ProductCardRender = productslist.map((product, index) => {
        return (
            <ProductCard
                name={product.name}
                price={product.price}
                key={product.id}
                slug={product.slug}
                image={product.card_banner}
            />
        );
    });

    useEffect(() => {
        const BrandWiseProduct = () => {
            setloading(true);
            api.get(`brand/${currentSlug.slug}/`).then((response) => {
                setproductslist(response.data);
                setbrandName(response.data[0].brand.name);
            });
            setloading(false);
        };
        BrandWiseProduct();
        return () => {
            setproductslist([]);
            setbrandName(null);
        };
    }, [useLocation()]);

    return (
        <div>
            <div className="trending-products pt-12 md:px-6 px-1">
                <h1 className="text-2xl font-bold mb-3">{brandName}</h1>
                <div className="grid md:grid-cols-5 grid-cols-2 md:gap-2 gap-1">
                    {ProductCardRender}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
