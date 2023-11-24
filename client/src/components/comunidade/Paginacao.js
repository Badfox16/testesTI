import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import Card from "./card";

export default function Paginacao({ contribuicoes, itemsPerPage }) {

    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(contribuicoes.slice(itemOffset, endOffset))
        console.log(currentItems)
        setPageCount(Math.ceil(contribuicoes.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, contribuicoes]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % contribuicoes.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems && (
                <div className="cards">
                    {currentItems.map((contribuicao) => (
                        <Card
                            key={contribuicao._id}
                            id={contribuicao._id}
                            createdAt={contribuicao.createdAt}
                            tipo={contribuicao.tipo}
                            cadeira={contribuicao.cadeira}
                            ano={contribuicao.ano}
                            semestre={contribuicao.semestre}
                            autor={contribuicao.autor}
                            titulo={contribuicao.titulo}
                            detalhes={contribuicao.detalhes}
                            ficheiro={contribuicao.ficheiro}
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