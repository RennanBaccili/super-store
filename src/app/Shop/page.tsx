import Slider from "../components/slider";

export default function PageMain() {

    
    return (
        <div className="bg-base-200"> 
            <div className="h-64">
                
            </div>
            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-10 mb-10"> Produtos Com Desconto</h1>
                </div>
                <hr className="mb-10"/>
                <Slider />
                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-10 mb-10"> Camisas</h1>
                </div>
                <hr className="mb-10"/>
                <Slider />
            </div>
        </div>
    );
}