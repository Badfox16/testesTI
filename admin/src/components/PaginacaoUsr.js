import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import TabelaUsr from "./TabelaUsr";

export default function Paginacao({ usuarios, itemsPerPage }) {

    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(usuarios.slice(itemOffset, endOffset))
        console.log(currentItems)
        setPageCount(Math.ceil(usuarios.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, usuarios]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % usuarios.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems && (
                <div className="cards">
                        <TabelaUsr
                            usuarios={currentItems}
                        />
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