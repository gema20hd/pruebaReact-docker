import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';
import CrearUsuario from './components/CrearUsuario';
import ListaDeUsuarios from './components/ListaDeUsuarios';


function App() {
  return (
    <div className="App">
      <ListaDeUsuarios></ListaDeUsuarios>
      <ToastContainer />
    </div>
  );
}

export default App;
