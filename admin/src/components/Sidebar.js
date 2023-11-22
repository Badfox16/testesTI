import React from "react";
import "../style/sidebar.css";
import { Link, useLocation  } from "react-router-dom";



function SideBar() {
    const location = useLocation();
    return (
        <div>
            <div className="barra-lateral">
                <div className="txt-titulo">
                    <div><img src="./img/chapeu.png" className="img-titulo" alt="Titulo"></img></div>
                    <div>Testes.TI</div>
                </div>
                <div className="box-perfil">
                    <div className="img-perfil">
                        <img src="./img/perfil.svg" alt="Foto de Perfil"></img>
                    </div>
                    <div className="nome-perfil">
                        <span>Mutizo de J. Maita</span>
                    </div>
                    <div className="cargo">
                        <span>Administrador</span>
                    </div>
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
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;