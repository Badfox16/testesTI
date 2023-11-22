import React from 'react';
import {Link} from "react-router-dom"
import '../style/Table.css';

export default function TabelaTestes({teste}) {

    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Disciplina</th>
                        <th>Ano de Frequência</th>
                        <th>Ano</th>
                        <th>Semestre</th>
                        <th>Docente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {teste.map((item, index) => (
                        <tr key={index}>
                            <td>{item.tipo}</td>
                            <td>{item.cadeira}</td>
                            <td>{item.ano}° ano</td>
                            <td>{item.ano_criacao}</td>
                            <td>{item.semestre}° semestre</td>
                            <td>{item.docente}</td>
                            <td>
                                <Link to={`/editar/${item._id}`}>
                                 <img src='./img/edit.png' alt='Editar' ></img>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}