import React, { useState, useEffect } from 'react'
import { conexionBaseDatos } from '../configuracionBaseDatos'
import { toast } from "react-toastify";
import '../assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function CrearUsuario() {
    const [error, setError] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');


    {/* funcion para insertar*/ }
    const verificarFormulario = async (evento) => {
        evento.preventDefault();
        if (!nombre.trim()) {
            setError('La caja de texto  de nombre está vacia')
            console.log('nombre vacio')
        } else if (!cedula.trim()) {
            setError('La caja de texto  de cedula está vacia')
            console.log('telefono vacio')
        }
        else if (!telefono.trim()) {
            setError('La caja de texto  de telefono está vacia')
            console.log('telefono vacio')
        }
        else if (!email.trim()) {
            setError('La caja de texto  de email está vacia')
            console.log('telefono vacio')
        }
        const listaUsuario = {
            nombre: nombre,
            cedula: cedula,
            telefono: telefono,
            email: email
        }
        try {
            const tabla = await conexionBaseDatos.collection('TBL_USUARIO').add(listaUsuario)
            console.log(tabla)
            console.log('Usuario registrado correctamente')
            toast("Usuario registrado correctamente", {
                type: "success",
                autoClose: 2000
            });
        } catch (e) {
            console.log('No se puede conectar a la base de datos')
            console.log(e)
        }
        setCodigo('')
        setNombre('')
        setCedula('')
        setTelefono('')
        setEmail('')
    }
    return (
        <div className="row">
            <div className="col-lg-4 offset-lg-4 mt-5">
                <span >Crear Usuarios</span>
                <form onSubmit={verificarFormulario} className="form-group" >
                    <div className="form-group row">
                        <label htmlFor="idCodigo" className="col-sm-2 col-form-label">Código:</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(ev) => { setCodigo(ev.target.value) }} className="form-control" id="idCodigo" value={codigo} placeholder="Ingrese el codigo"></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="idNombre" className="col-sm-2 col-form-label">Nombre:</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(ev) => { setNombre(ev.target.value) }} className="form-control" id="idNombre" value={nombre} placeholder="Ingrese el nombre de usuario"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="idCedula" className="col-sm-2 col-form-label">Cedula:</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(ev) => { setCedula(ev.target.value) }} className="form-control" id="idCedula" value={cedula} placeholder="Ingrese la cedula "></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="idTelefono" className="col-sm-2 col-form-label">Teléfono:</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(ev) => { setTelefono(ev.target.value) }} className="form-control" id="idTelefono" value={telefono} placeholder="Ingrese telefono"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="idEmail" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" onChange={(ev) => { setEmail(ev.target.value) }} className="form-control" id="idEmail" value={email} placeholder="Ingrese el email"></input>
                        </div>
                    </div>
                    <input className=" btn btn-primary btn-block" type="submit" value="Registrar"></input>
                </form>
                {
                    error ?
                        (<div>
                            <p>{error}</p>
                        </div>)
                        :
                        (<span> </span>)

                }
            </div>

        </div>
    );

}
export default CrearUsuario;