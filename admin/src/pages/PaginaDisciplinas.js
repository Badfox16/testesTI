import React, { useEffect, useState } from 'react';
import TabelaDisciplinas from '../components/TabelaDisciplinas'
import Pagination from '../components/Pagination';
import '../style/Disciplinas.css';
import Search from '../components/Search';


const PaginaDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(`http://localhost:5000/pesquisa/disciplinas?cadeira=${search}`)
      .then(response => response.json())
      .then(data => {
        setDisciplinas(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [search])

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentTable = disciplinas.slice(firstRowIndex, lastRowIndex)
  return (
    <div className='disciplinas'>
      <div>
        <Search search={search} setSearch={setSearch}/>
      </div>
      <TabelaDisciplinas disciplinas={currentTable} search={search} />
      <Pagination
        totalRows={disciplinas.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default PaginaDisciplinas;