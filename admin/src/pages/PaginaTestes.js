import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import TabelaTestes from '../components/TabelaTestes';

const PaginaExames = () => {
  const [testes, setTestes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pesquisa, setPesquisa] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pesquisa/testes?cadeira=${pesquisa}`);
        const data = await response.json();
        setTestes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTestes();
  }, [pesquisa]);

    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentTable = testes.slice(firstRowIndex, lastRowIndex)
  return (
    <div className='testes'>
      <div>
      <Search pesquisa={pesquisa} setPesquisa={setPesquisa} />
      </div>
      <TabelaTestes teste={currentTable}/>
      <Pagination
        totalRows={testes.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default PaginaExames;