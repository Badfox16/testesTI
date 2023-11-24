import React, { useEffect, useState } from 'react';
import TabelaUsr from '../components/TabelaUsr';
import Search from '../components/Search';
import '../style/Disciplinas.css'

const PaginaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`http://localhost:5000/pesquisa/usuarios?cadeira=${search}`)
            .then(response => response.json())
            .then(data => {
                setUsuarios(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [search])


    return (
        <div>PaginaUsuarios</div>
    )
}

export default PaginaUsuarios