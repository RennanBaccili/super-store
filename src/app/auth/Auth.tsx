import { useEffect, useState } from 'react';
import { UserDTO } from '../models/Dto/UserDTO';
import { useAuth } from './AuthContext.';

// Define o componente AuthModal que recebe as props isOpen e onClose
export default function AuthModal({ isOpen, onClose }: any) {
    const { signIn, register } = useAuth();
    const [loginEmail, setLoginEmail] = useState(''); // Estado para o email de login
    const [loginPassword, setLoginPassword] = useState(''); // Estado para a senha de login
    const [registerEmail, setRegisterEmail] = useState(''); // Estado para o email de registro
    const [registerUsername, setRegisterUsername] = useState(''); // Estado para o nome de usuário de registro
    const [registerPassword, setRegisterPassword] = useState(''); // Estado para a senha de registro

     const handleLogin = async () => {
        try {
            await signIn(new UserDTO('', loginEmail, loginPassword));
            onClose();
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleRegister = async () => {
        try {
            await register(new UserDTO(registerUsername, registerEmail, registerPassword));
            onClose();
        } catch (error) {
            console.error('Erro ao fazer registro:', error);
        }
    };

    useEffect(() => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            isOpen ? modal.showModal() : modal.close();
        }
    }, [isOpen]);

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box max-w-4xl max-h-screen flex flex-col justify-center">
                <div className='flex justify-between items-center'>
                    <h2 className="font-extrabold text-lg pl-10">Seja Bem vindo</h2>
                    <form method="dialog" className="pr-10">
                        <button className="btn" onClick={onClose}>Sair</button> {/* Botão para fechar o modal */}
                    </form>
                </div>
                <div className='flex'>
                    {/* Formulário de Login */}
                    <form className='w-full h-96 p-10 justify-between flex flex-col' onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className='gap-4 flex flex-col'>
                            <h3 className='font-bold'>Login</h3>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    value={loginEmail} // Valor do campo controlado pelo estado loginEmail
                                    onChange={(e) => setLoginEmail(e.target.value)} // Atualiza o estado loginEmail quando o valor do campo muda
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                                </svg>
                                <input
                                    type="password"
                                    className="grow"
                                    value={loginPassword} 
                                    onChange={(e) => setLoginPassword(e.target.value)} 
                                />
                            </label>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <a className=''>Esqueci a senha</a>
                            <a className=''>Não consigo entrar ?</a>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {/* Formulário de Registro */}
                    <form className='w-full h-96 p-10 justify-between flex flex-col' onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                        <div className='gap-4 flex flex-col'>
                            <h3 className='font-bold'>É novo aqui ? cadastre-se</h3>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    value={registerEmail} // Valor do campo controlado pelo estado registerEmail
                                    onChange={(e) => setRegisterEmail(e.target.value)} // Atualiza o estado registerEmail quando o valor do campo muda
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Username"
                                    value={registerUsername} // Valor do campo controlado pelo estado registerUsername
                                    onChange={(e) => setRegisterUsername(e.target.value)} // Atualiza o estado registerUsername quando o valor do campo muda
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                                </svg>
                                <input
                                    type="password"
                                    className="grow"
                                    value={registerPassword} // Valor do campo controlado pelo estado registerPassword
                                    onChange={(e) => setRegisterPassword(e.target.value)} // Atualiza o estado registerPassword quando o valor do campo muda
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary align-bottom">Cadastrar</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
