import React from 'react'
import '../style/Table.css';

const TabelaUsr = ({usuarios, search}) => {
    const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(search.toLowerCase())
);

return (
    <div className="table-wrapper">
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Apelido</th>
                    <th>Email</th>
                    <th>Senha</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsuarios.map((usuario) => (
                    <tr key={usuario._id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.apelido}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.senha}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TabelaUsr