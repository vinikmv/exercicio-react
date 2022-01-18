import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Lista from './components/Lista';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Formulario />} />
    <Route path="/listagem" element={<Lista />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
