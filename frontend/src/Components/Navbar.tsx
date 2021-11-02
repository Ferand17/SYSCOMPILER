import React from 'react'
import * as NavbarModules from './Navbar.controller'
import logo from '../Assets/compilation.png'

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={logo} alt='Logo' width={45} />
                <a className="navbar-brand" href="/">SYSCOMPILER</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Funcionalidades</a>
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={NavbarModules.crearArchivo} >Crear Archivo</button>
                                <button className="dropdown-item" onClick={NavbarModules.abrirArchivo}>Abrir Archivo</button>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Caracteristicas</a>
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={NavbarModules.creartextarea} >Crear Pestaña</button>
                                <button className="dropdown-item" onClick={NavbarModules.eliminartextarea}>Eliminar Pestaña</button>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Herramientas</a>
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={NavbarModules.ejecutar}>Ejecutar</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
