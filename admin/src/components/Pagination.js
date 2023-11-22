import React from 'react';
import '../style/Pagination.css';

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage }) => {
    let pages = [];

    for (let i = 1; i  < Math.ceil(totalRows / rowsPerPage) + 1; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
