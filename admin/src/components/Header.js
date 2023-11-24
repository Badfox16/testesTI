import React, { useContext, useEffect } from 'react';
import { Link, useLocation  } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <div>

            <header>
                <div>
                    <Link to={'/'} className='logo-container'>
                        <img src={'./img/chapeu.png'} alt='logo' className='img-logo'></img>
                        <span>Testes.TI</span>
                    </Link>
                </div>
                <div className="menu-opcoes">
                    <ul className="menu-items">
                        <li >
                            <Link to={'/'}>
                                <img src="./img/menu-principal.svg" className="img" alt="Ícone do menu principal"></img>
                                <span className={location.pathname === '/' ? 'active' : ''}>Menu Principal</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/criar'}>
                                <img src="./img/caneta-exames.svg" className="img" alt="Ícone do construtor de exames"></img>
                                <span className={location.pathname === '/criar' ? 'active' : ''}>Criador</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/ver'}>
                                <img src="./img/exames.png" className="img" alt="Ícone de exames"></img>
                                <span className={location.pathname === '/ver' ? 'active' : ''}>Exames</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/disciplinas'}>
                                <img src="/img/livros.png" className="img" alt="Ícone de correções"></img>
                                <span className={location.pathname === '/disciplinas' ? 'active' : ''}>Disciplinas</span>
                            </Link>
                        </li> <li>
                            {/* <Link to={'/usuarios'}>
                                <img src="/img/livros.png" className="img" alt="Ícone de correções"></img>
                                <span className={location.pathname === '/usuarios' ? 'active' : ''}>Usuarios</span>
                            </Link> */}
                        </li>
                    </ul>
                </div>
            </header>
          
        </div>
    )
}