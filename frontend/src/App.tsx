import React from 'react';
import Navbar from './Components/Navbar';
import TextEditor from './Components/TextEditor';
import Reports from './Components/Reports';
import './App.css';
import './Styles.css'

function App() {
  return (
    <>
      <input type="file" id="files" accept='.sc' hidden />
      <Navbar/>
      <div className='container-fluid p-4'>
        <div className='row align-items-start'>
          <TextEditor />
          <Reports />
        </div>
      </div>
    </>
  );
}

export default App;
