import React,{useState} from 'react'
import ReactJson from 'react-json-view';
import axios from 'axios'
const Reports = () => {

    //Visualizacion de AST
    const [mijson,setMijson] = useState({})
    const reportero = async ()=>{
        const getSalida= await axios.get('http://localhost:5000/salida')
        const errores = getSalida.data.ast;
        setMijson(errores);
    }
    
    return (
        <div className='col'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#consola">Consola</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#errores">Errores</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#ast"onClick={reportero} >AST</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#simbolo">Simbolos</a>
                </li>
            </ul>
            <div id="myTabContent" className="esp tab-content">
                <div className="tab-pane fade show active" id="consola">
                    <textarea
                        readOnly
                        className='consola'
                    >
                    </textarea>
                </div>
                <div className="tab-pane fade" id="errores">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Error</th>
                                <th scope="col">Fila</th>
                                <th scope="col">Columna</th>
                            </tr>
                        </thead>
                        <tbody id='contenidoErrores'>
                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade" id="ast">
                    <ReactJson src={mijson} />                   
                </div>
                <div className="tab-pane fade" id="simbolo">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Tipo Valor</th>
                                <th scope="col">tipo</th>
                                <th scope="col">entorno</th>
                                <th scope="col">Fila</th>
                                <th scope="col">Columna</th>
                            </tr>
                        </thead>
                        <tbody id='contenidoSimbolos'>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Reports
