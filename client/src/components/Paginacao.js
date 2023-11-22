import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import TesteCard from "./TesteCard";

export default function Paginacao({ testes, itemsPerPage }) {

    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(testes.slice(itemOffset, endOffset))
        console.log(currentItems)
        setPageCount(Math.ceil(testes.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, testes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % testes.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems && (
                <div className="cards">
                    {currentItems.map((teste) => (
                        <TesteCard
                            key={teste._id}
                            id={teste._id}
                            tipo={teste.tipo}
                            cadeira={teste.cadeira}
                            ano={teste.ano}
                            semestre={teste.semestre}
                            ano_criacao={teste.ano_criacao}
                            conteudo={teste.conteudo}
                            docente={teste.docente}
                            ficheiro={teste.ficheiro}
                        />
                    ))}
                </div>
            )}
            <ReactPaginate
                breakLabel="..."
                nextLabel="Próxima >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeClassName="ativo"
            />
        </>
    )
}