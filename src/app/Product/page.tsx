'use client'

import { useState } from 'react';

export default function ProductPage() {
  
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files && e.target.files[0]; 
    
        if (file) {
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            }
        
            reader.readAsDataURL(file);
        }
    }
  
    return (
        <section className="bg-base-200 h-screen flex justify-center items-center"> 
            <div className="flex flex-wrap flex-col bg-slate-700 p-10 border rounded-lg">
                <div className='flex flex-wrap flex-row'>
                    <div className="flex flex-wrap flex-col gap-6">
                        <label className="input input-bordered flex items-center gap-2">
                            Nome:
                        <input type="text" className="grow" placeholder="Nome do Produto" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Quantidade:
                        <input type="number" className="grow" placeholder="Quantidade" />
                        </label>
                    
                        <label className="input input-bordered flex items-center gap-2">
                            Price:
                        <input type="" className="grow" placeholder=" 00,00" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Classe:
                        <input type="text" className="grow" placeholder="Tipo de Produto" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Quantidade:
                        <input type="number" className="grow" placeholder="Quantidade" />
                        </label>
                        <textarea placeholder="Descrição" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                    </div>
                    <div>
                        <div className="flex flex-col items-center h-full">
                            {imagePreviewUrl && (
                                <div className="mt-3">
                                    <img src={imagePreviewUrl} alt="Preview" className="max-w-xs" />
                                </div>
                            )}
                            <div className="p-5 mt-auto">
                                <input type="file" className="file-input file-input-bordered file-input-md w-full max-w-xs"
                                    accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <button className="btn btn-primary w-full">Cadastrar</button>
                </div>
            </div>
           
        </section>
    );
}