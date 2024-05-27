"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import './slider.css';

const data = [
    {
        id: 1,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 1",
        description: "Description for Item 1",
        buttonText: "Button 1"
    },
    {
        id: 2,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 2",
        description: "Description for Item 2",
        buttonText: "Button 2"
    },
   
    {
        id: 3,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 3",
        description: "Description for Item 3",
        buttonText: "Button 3"
    },
    {
        id: 4,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 4",
        description: "Description for Item 4",
        buttonText: "Button 4"
    },
    {
        id: 5,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 5",
        description: "Description for Item 5",
        buttonText: "Button 5"
    },
    {
        id: 6,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 6",
        description: "Description for Item 6",
        buttonText: "Button 6"
    },  {
        id: 7,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 6",
        description: "Description for Item 6",
        buttonText: "Button 6"
    },  {
        id: 8,
        imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Item 6",
        description: "Description for Item 6",
        buttonText: "Button 6"
    },
];

const Slider: React.FC = () => {
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free",
        slides: {
            perView: getPerView(),
            spacing: 70,
        },
    });

    const [perView, setPerView] = useState(getPerView());

    useEffect(() => {
        const handleResize = () => {
            setPerView(getPerView());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function getPerView() {
        if (window.innerWidth <= 500) {
                return 2;
        }
        else if (window.innerWidth <= 750) {
            return 3;
        }
        else if (window.innerWidth <= 1000) {
            return 4;
        } else if (window.innerWidth <= 1450) {
            return 5;
        } else if (window.innerWidth <= 1750) {
            return 6;
        } else {
            return 8;
        }
    }

    return (
        <div ref={ref} className="keen-slider " >
            {data.map((item) => (
                <div key={item.id} className="keen-slider__slide card card-compact bg-base-100 shadow-xl">
                    <figure><img src={item.imageUrl} alt={item.title} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">{item.buttonText}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;