import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DisqusComments from "../components/commentarios/DisqusComments";

export default function PaginaDetalhesTeste() {
    const [testeInfo, setTesteInfo] = useState(null)
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/teste/${id}`)
            .then(response => {
                response.json().then(teste => {
                    setTesteInfo(teste)
                })
            })
    }, []);

    if (!testeInfo) return '';

    return (
        <main className="um-teste">
            <div className="teste">
                <h1>{testeInfo.cadeira}</h1>
                <h3>{testeInfo.tipo}</h3>
            </div>
            <div className="detalhes">
                <h4>Detalhes:</h4>
                <p><b>Ano de Frequência:</b> {testeInfo.ano}° ano</p>
                <p><b>Semestre:</b> {testeInfo.semestre}° semestre </p>
                <p><b>Ano:</b> {testeInfo.ano_criacao}</p>
                <p><b>Docente:</b> {testeInfo.docente}</p>
            </div>

            <div className="conteudo" dangerouslySetInnerHTML={{ __html: testeInfo.conteudo }}>
            </div>
            <div>
                <a href={`http://localhost:5000/${testeInfo.ficheiro}`} target="_blank" rel="noopener noreferrer">
                    <button className="baixar">Baixar</button>
                </a>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <DisqusComments id={`${id}`} titulo={`${testeInfo.tipo} ${testeInfo.cadeira}`}/>
        </main>
    );
}