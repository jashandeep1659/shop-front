import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

export default function ProdctSwiper(props) {
    const ImageRender = props.images.map((element, index) => {
        return (
            <SwiperSlide
                className="flex items-center justify-center bg-white"
                key={index}
            >
                <img src={`${element}`} />
            </SwiperSlide>
        );
    });
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper h-full"
            >
                {ImageRender}
            </Swiper>
        </>
    );
}
