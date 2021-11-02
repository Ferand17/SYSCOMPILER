import React from 'react'

const TextEditor = () => {

    return (
        <div className='col'>
            <ul className="nav nav-tabs" id='buttonstextareas'>
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href='#tab1'>tab1</a>
                </li>
            </ul>
            <div id="textareas" className="esp tab-content">
                <div className="tab-pane fade active show" id='tab1'>
                    <textarea
                        className='numerado'
                    >
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default TextEditor
