import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import DisqusComments from "../components/commentarios/DisqusComments";
import { UserContext } from "../UserContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'

const PaginaContribuicao = () => {
    const [contribuicaoInfo, setContribuicaoInfo] = useState(null)
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
          db.collection("usuarios").doc(user.uid).set({
            email: user.email,
            nome: user.displayName,
            photoURL: user.photoURL,
          });
        }
      }, [user]);
      
    const nome = `${userInfo?.nome} ${userInfo?.apelido}` || user?.nome;

    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/contribuicao/${id}`)
            .then(response => {
                response.json().then(contribuicao => {
                    setContribuicaoInfo(contribuicao)
                })
            })
    }, []);

    if (!contribuicaoInfo) return '';


    return (
        <main className="um-teste">
            <div className="teste">
                <h1>{contribuicaoInfo.titulo}</h1>
                <h3>{contribuicaoInfo.tipo}</h3>
            </div>
            <div className="detalhes">
                <h4>Informações:</h4>
                <p><b>Ano de Frequência:</b> {contribuicaoInfo.ano}° ano</p>
                <p><b>Semestre:</b> {contribuicaoInfo.semestre}° semestre </p>
                <p><b>Cadeira:</b> {contribuicaoInfo.cadeira}</p>
                <p><b>Autor:</b> {contribuicaoInfo.autor}</p>
            </div>
            {nome === contribuicaoInfo.autor && (
            <Link className="edit-btn" to={`/comunidade/editar/${contribuicaoInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Editar
          </Link>
           )} 
            <h4 style={{color:"#ff5757"}}>Detalhes:</h4>
            <div className="conteudo" dangerouslySetInnerHTML={{ __html: contribuicaoInfo.detalhes }}>
            </div>
            {contribuicaoInfo?.ficheiro && (
                <div>
                    <a href={`http://localhost:5000/${contribuicaoInfo.ficheiro}`} target="_blank" rel="noopener noreferrer">
                        <button className="baixar">Baixar</button>
                    </a>
                </div>
            )}
            <br></br>
            <hr></hr>
            <br></br>
            <DisqusComments id={`${id}`} titulo={`${contribuicaoInfo.titulo}`} />
        </main>
    )
}

export default PaginaContribuicao