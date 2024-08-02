"use client";

import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import './slider.css';
import { Product } from "../models/Product";

// Assuming Category is already imported
import { Category } from "../models/Category";

// Mock categories
const electronics = new Category(1, "Electronic gadgets and devices");
const books = new Category(1, "All kinds of books");
const homeAppliances = new Category(1, "Essential home appliances");

// Mock products
const mockProducts = [
    new Product("Smartphone 12X", "Latest model with high resolution camera", 799, 50, electronics, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Epic Fantasy Book", "Explore epic fantasy worlds", 19.99, 100, books, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Microwave Oven", "Quick cooking solutions", 150, 30, homeAppliances, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Smart Watch", "Your health on your wrist", 299, 75, electronics, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Historical Novel", "Journey through history", 24.99, 80, books, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Blender", "Make smoothies in seconds", 89, 60, homeAppliances, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Tablet 8 Pro", "For work and play", 649, 40, electronics, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Science Fiction", "Sci-fi at its best", 29.99, 90, books, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Toaster", "Perfect toast every time", 34, 50, homeAppliances, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
    new Product("Laptop Pro", "High performance for professionals", 1200, 25, electronics, "https://static.nike.com/a/images/t_default/5ad01975-3d1e-4720-8853-5327e4dada08/sapatilhas-air-force-1-mid-off-white.png"),
];

interface SliderProps {
    products: Product[];
}

const KeenSlider = ({ products: initialProducts }: SliderProps) => {
    const [products, setProducts] = useState(initialProducts.length > 0 ? initialProducts : mockProducts);

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
        if (typeof window === "undefined") {
            return 4; 
        }
        if (window.innerWidth <= 500) {
            return 2;
        } else if (window.innerWidth <= 750) {
            return 3;
        } else if (window.innerWidth <= 1000) {
            return 4;
        } else if (window.innerWidth <= 1450) {
            return 5;
        } else if (window.innerWidth <= 1750) {
            return 6;
        }
        return 8;
    }

    return (
        <div ref={ref} className="keen-slider">
            {products.map((item, index) => (
                <div key={index} className="keen-slider__slide card card-compact bg-base-100 shadow-xl">
                    <figure>
                        <img src={item.imageUrl} alt={item.name} onError={(e) => e.currentTarget.src = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KeenSlider;
