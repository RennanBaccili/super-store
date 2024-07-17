import { Product } from "../models/Product";

interface SliderProps {
    products: Product[];
}

export default function SliderMessage({ products }: SliderProps){
    return (
        <>
            <div className="w-full flex flex-row gap-10">
                {products.map((item, index) => (
                        <div key={index} className="card glass w-96">
                            <figure>
                                <img src={item.imageUrl} alt={item.name} onError={(e) => e.currentTarget.src = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />
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
              </div>
        </>
    );
}