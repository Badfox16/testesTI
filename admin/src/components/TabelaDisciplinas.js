import React from 'react';
import '../style/Table.css';

export default function TabelaDisciplinas({ disciplinas, search }) {
    const filteredDisciplinas = disciplinas.filter((disciplina) =>
        disciplina.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ano</th>
                        <th>Semestre</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDisciplinas.map((disciplina) => (
                        <tr key={disciplina._id}>
                            <td>{disciplina.nome}</td>
                            <td>{disciplina.ano}° ano</td>
                            <td>{disciplina.semestre}° semestre</td>
                            <td> <img src='./img/edit.png' alt='Editar' ></img></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}