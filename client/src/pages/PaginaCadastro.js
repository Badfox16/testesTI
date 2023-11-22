import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function PaginaCadastro() {
    const [nome, setNome] = useState("");
    const [apelido, setApelido] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usuarioData = {
            nome: nome,
            apelido: apelido,
            email: email,
            senha: senha
        }

        try {
            const response = await axios.post('http://localhost:5000/cadastro', usuarioData);
            if (response.status >= 200 && response.status < 300) {
                alert('Cadastro bem sucedido')
                setRedirect(true);
            }
        } catch (error) {
            alert('Telefone ou e-mail já estão em uso');
        }
    }
    if (redirect) {
       return <Navigate to={'/entrar'} /> 
    }

    return (
        <div>    
            <div className="content">
                <div className="left">
                    <div className="form-block">
                        <div className="form-title">
                            <h3>Cadastro</h3>
                            <p>Cadastre-se agora para começar a pesquisar por testes</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" maxLength="120" required placeholder="Insira o seu nome" id="nome" className="form-field w-input" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <label htmlFor="apelido">Apelido</label>
                            <input type="text" name="apelido" maxLength="120" required placeholder="Insira o seu apelido" id="apelido" className="form-field w-input" value={apelido} onChange={(e) => setApelido(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" maxLength="120" required placeholder="Insira o seu e-mail" id="email" className="form-field w-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="senha" id="password" required maxLength="80" className="form-field w-input" placeholder="Insira a sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <input type="submit" value="Cadastrar" className="btn-primary w-button" />
                        </form>

                        <div className="form-footer">
                            <span className="text">Já tem uma conta?</span>
                            <Link to={'/entrar'}>
                                <a href="/#">Faça login</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div className="content-block">
                        <h1>Vamos criar a sua conta!</h1>
                        <img src={'./graduation.png'} alt="Universidade" className="img-universidade"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}