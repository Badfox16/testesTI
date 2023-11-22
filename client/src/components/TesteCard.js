import React from "react";
import { Link } from "react-router-dom";
import '../style/TesteCard.css';

export default function TesteCard({id, cadeira, docente, ano, semestre, ano_criacao, tipo }) {
    return (
            <div className="card">
                <div className="course">
                    <div className="course-preview">
                        <h6>Cadeira</h6>
                        <h2>{cadeira}</h2>
                        <a href="#">Docente: {docente} <i className="fas fa-chevron-right"></i></a>
                    </div>
                    <div className="course-info">
                        <div className="progress-container">
                            <span className="progress-text">
                                {ano}° ano / {semestre}° Semestre
                            </span>
                        </div>
                        <h6>{ano_criacao}</h6>
                        <h2>{tipo}</h2>
                        <Link to={`/teste/${id}`}>
                        <button className="btn">Ver mais</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}