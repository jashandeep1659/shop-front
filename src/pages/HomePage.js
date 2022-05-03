import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mainBannerApi, AllProducts } from "../actions/index";
import NewsLetter from "../components/NewsLetter";
import ProductCard from "../components/ProductCard";

const HomePage = (props) => {
    useEffect(() => {
        props.mainBannerApi();
        props.AllProducts();
    }, []);
    const ProductRender = props.products.slice(0, 6).map((product, index) => {
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

    return (
        <section id="HomePage">
            <div className="top-banner md:py-24 grid md:grid-cols-2 shadow-xl md:px-12 px-6 py-12 ">
                <div className="text flex justify-center flex-col order-2 md:order-1">
                    <h1 className="md:text-6xl text-2xl font-bold">
                        {props.banner.name}
                    </h1>
                    <p className="md:text-xl text-lg ml-1">
                        {props.banner.special_line}
                    </p>
                    <div>
                        <Link to={`${props.banner.link}`}>
                            <button className="ml-1 mt-6 font-bold px-6 py-2 rounded text-white">
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="image flex  items-center justify-center md:order-2 order-1">
                    <img src={props.banner.product_image} />
                </div>
            </div>

            <div className="trending-products pt-12 md:px-6 px-1">
                <div className="grid md:grid-cols-5 grid-cols-2 md:gap-2 gap-1">
                    {ProductRender}
                </div>
            </div>
            <NewsLetter />
            <div className="trending-products pt-12 md:px-6 px-1">
                <div className="grid md:grid-cols-5 grid-cols-2 md:gap-2 gap-1">
                    {ProductRender}
                </div>
            </div>
        </section>
    );
};
const mapStateToProps = (state) => {
    return {
        banner: state.mainBannerApi,
        products: Object.values(state.AllProducts),
    };
};
export default connect(mapStateToProps, { mainBannerApi, AllProducts })(
    HomePage
);
