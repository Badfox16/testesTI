import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [user, loading] = useAuthState(auth);

    const location = useLocation();




    useEffect(() => {
        fetch('http://localhost:5000/perfil', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    useEffect(() => {
        if (user) {
            db.collection("usuarios").doc(user.uid).set({
                email: user.email,
                nome: user.displayName,
                photoURL: user.photoURL,
            });
        }
    }, [user]);

    async function logout() {
        try {
            if (userInfo) {
                await fetch('http://localhost:5000/sair', {
                    credentials: 'include',
                    method: 'POST',
                });
                setUserInfo(null);
            } else if (user) {
                await auth.signOut();
            }
        } catch (error) {
            alert('Falha no logout')
        }
    }


    const email = userInfo?.email || user?.email;
    // const nome = userInfo?.nome;
    // const apelido = userInfo?.apelido;

    return (
        <div>

            <header>
                <div>
                    <Link to={'/'} className='logo-container'>
                        <img src={'./logo512.png'} alt='logo' className='img-logo'></img>
                        <span>Testes.TI</span>
                    </Link>
                </div>
                <div className='link-container'>
                    {email ? (
                        <>
                            <Link to="/chat">Chat.TI</Link>
                            {window.location.pathname === "/comunidade" ? (
                                <>
                                    {/* Renderizar links específicos para /comunidade */}
                                    <Link to="/comunidade/criar">Publicar</Link>
                                    <Link to="/" onClick={logout}>Sair</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/comunidade">Comunidade</Link>
                                    <Link to="/" onClick={logout}>Sair</Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/entrar">Entrar</Link>
                            <Link to="/cadastro">Cadastre-se</Link>
                        </>
                    )}
                </div>
            </header>

        </div>
    )
}
