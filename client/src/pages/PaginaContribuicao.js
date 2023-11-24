import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisqusComments from "../components/commentarios/DisqusComments";

const PaginaContribuicao = () => {
    const [contribuicaoInfo, setContribuicaoInfo] = useState(null)

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