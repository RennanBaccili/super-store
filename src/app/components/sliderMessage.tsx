import React from 'react';
import Slider from 'react-slick';
import { Product } from "../models/Product";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
    products: Product[];
}

const SliderMessage: React.FC<SliderProps> = ({ products }) => {
    const settings = {
        infinite: true,
        speed: 50,
        arrows: false, 
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {products.map((item, index) => (
                <div key={index} className="card glass flex m-4 w-full max-w-xs">
                    <figure>
                        <img className='w-full h-auto object-cover' src={item.imageUrl} alt={item.name} onError={(e) => e.currentTarget.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tKiMWP7yMxNxgS_jNsejO8rb54NzsPKhDw&s'} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default SliderMessage;
