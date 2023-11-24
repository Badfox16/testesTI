import React from 'react'
import {format} from 'date-fns'
import { Link } from "react-router-dom";
import './card.scss'

const CardComunidade = ({id, cadeira, autor, ano, semestre, detalhes, tipo, titulo, createdAt}) => {
    const imageUrl = 'https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg';

    return (
        <div className='body'>
            <div className="blog-card alt">
                <div className="meta">
                    <div className="photo" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                    <ul className="details">
                        <li className="author">Autor: {autor}</li>
                        <time className='date'>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
                        <li className="tags">
                            <ul>
                                <li>Tipo: {tipo}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="description">
                    <h1>{titulo}</h1>
                    <h2>{cadeira}</h2>
                    <p dangerouslySetInnerHTML={{ __html: detalhes }}></p>
                    <p className="read-more">
                        <Link to={`/contribuicao/${id}`}>
                            Ver mais
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardComunidade