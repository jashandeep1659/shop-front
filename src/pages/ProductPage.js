import React, { useEffect, useState } from "react";
import ProdctSwiper from "../components/ProductSwiper";
import api from "../api/index";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { AllProducts, CART_NUMBER_UPDATER } from "../actions/index";
import { connect } from "react-redux";

const ProductPage = (props) => {
    const currentslug = useParams();

    const [loading, setloading] = useState(true);
    const [product, setproduct] = useState(null);
    const [presentInCart, setpresentInCart] = useState(false);
    const [productimages, setproductimages] = useState([]);
    const ProductRender = props.products.map((product) => {
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
    const addToCart = () => {
        let data = { id: product.id, quantity: 1 };
        api.post("cart/", data).then((response) => {
            if (props.userStatus) {
                props.CART_NUMBER_UPDATER();
            }
            cartChecker();
        });
    };
    const cartChecker = () => {
        if (product && props.userStatus) {
            api.get("cart").then((responsecart) => {
                responsecart.data.forEach((element) => {
                    if (product.id === element.product.id) {
                        setpresentInCart(true);
                        throw "Break";
                    } else {
                        setpresentInCart(false);
                    }
                });
            });
        }
        ButtonRender();
    };
    const ButtonRender = () => {
        if (presentInCart) {
            return (
                <Link to="/cart">
                    <button className="add-to-cart">Check Cart</button>
                </Link>
            );
        } else {
            return (
                <button className="add-to-cart" onClick={addToCart}>
                    Add to Cart
                </button>
            );
        }
    };
    const getProduct = async () => {
        const response = await api.get(`/product/${currentslug.productID}/`);
        await setproduct(response.data);
        await setloading(false);
    };
    useEffect(() => {
        setloading(true);
        getProduct();
        props.AllProducts();
    }, [useLocation()]);

    useEffect(() => {
        const imagesCreater = () => {
            if (product) {
                let images = [];
                images.push(product.large_baner);
                product.product_images.forEach((element) => {
                    images.push(element.image);
                });

                setproductimages(images);
            }
        };
        cartChecker();
        imagesCreater();
    }, [product, useLocation()]);

    if (!loading) {
        return (
            <section id="ProductPage" className="md:px-6 pt-6">
                <div className="main-product grid md:grid-cols-2 md:mx-12 mx-3 grid-cols-1 gap-12">
                    <div className="product-images">
                        <ProdctSwiper images={productimages} />
                    </div>
                    <div className="product-detail">
                        <Link
                            to={`/brand/${product.brand.slug}`}
                            className="brandname text-blue-500"
                        >
                            {product.brand.name}
                        </Link>
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <p className="ml-1">{product.special_line}</p>

                        <h1 className="mt-4 text-2xl font-bold ml-1">
                            ${product.price}
                        </h1>
                        <div className="cart-functions">
                            <p className="text-sm ">Size: XL</p>
                            <p className="text-sm ">Colour: Pink</p>
                            <div className="dropdown my-3">
                                <label className="mr-2 font-medium">
                                    Choose Quantity:
                                </label>

                                <select name="cars" id="cars">
                                    <option value="volvo">1</option>
                                    <option value="saab">2</option>
                                    <option value="mercedes">3</option>
                                    <option value="audi">4</option>
                                </select>
                            </div>
                            <div className="buttons">
                                {props.userStatus ? (
                                    <ButtonRender />
                                ) : (
                                    <Link to="/login">
                                        <button
                                            to="/login"
                                            className="add-to-cart"
                                        >
                                            Sign required
                                        </button>
                                    </Link>
                                )}
                            </div>

                            <p className="mt-6 text-sm">{product.detail}</p>
                        </div>
                    </div>
                </div>
                <div className="other products">
                    <div className="trending-products pt-12 md:px-6 px-1">
                        <div className="grid md:grid-cols-5 grid-cols-2 md:gap-2 gap-1">
                            {ProductRender}
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section>
                {" "}
                <div className="h-screen w-full bg-slate-500 flex items-center justify-center">
                    <i className="bx bx-loader m-0 animate-spin-slow text-white text-4xl "></i>
                </div>
            </section>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        products: Object.values(state.AllProducts),
        userStatus: state.AUTHENTICATE_THE_USER,
    };
};
export default connect(mapStateToProps, { AllProducts, CART_NUMBER_UPDATER })(
    ProductPage
);
