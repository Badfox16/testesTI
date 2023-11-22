import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import GoogleLogin from "../components/googleLogin";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'

export default function PaginaLogin() {
    const { setUserInfo } = useContext(UserContext); 
    const [user, loading] = useAuthState(auth);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user) {
          db.collection("usuarios").doc(user.uid).set({
            email: user.email,
            nome: user.displayName,
            photoURL: user.photoURL,
          });

          setRedirect(true)
        }
      }, [user]);

  async function login(event) {
        event.preventDefault();
        
        const response = await fetch("http://localhost:5000/entrar", {
            method: "POST",
            body: JSON.stringify({ email, senha }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        } else {
            alert("Credenciais Invalidas")
        }
    }


    if (redirect) {
        return <Navigate to={'/'} /> 
     }

    return (
        <div className="content">
            <div className="left">
                <div className="form-block">
                    <div className="form-title">
                        <h3>Login</h3>
                        <p>Faça login para começar a pesquisar por testes</p>
                    </div>
                    <form onSubmit={login}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            maxLength="120"
                            required
                            placeholder="Insira o seu e-mail"
                            id="email"
                            className="form-field w-input"
                            value={email}
                    onChange={ev => setEmail(ev.target.value)}
                        />
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            id="password"
                            required
                            maxLength="80"
                            className="form-field w-input"
                            placeholder="Insira a sua senha"
                            value={senha}
                            onChange={ev => setSenha(ev.target.value)}

                        />
                        <button type="submit" className="btn-primary w-button">Entrar</button>
                    </form>
                    <div className="form-footer">
                        <span className="text">Não tem uma conta?</span>
                        <Link to={'/cadastro'}>
                            <a href="/#">Faça já o seu cadastro</a>
                        </Link>
                    </div>
                    <p>Ou</p>
                    <GoogleLogin/>
                </div>
            </div>

            <div className="right">
                <div className="content-block">
                    <h1>Bem-vindo ao Testes.TI</h1>
                    <img src={'./universidade.svg'} alt="Universidade" className="img-universidade" />
                </div>
            </div>
        </div>
    )
}
