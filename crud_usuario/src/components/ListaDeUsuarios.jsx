import React, { useState, useEffect } from 'react'
import { conexionBaseDatos } from '../configuracionBaseDatos'
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import CrearUsuario from '../components/CrearUsuario';





function ListaDeUsuarios() {
  const [modoEdicion, setModoEdicion] = useState(null);
  const [error, setError] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [tablaUsuarios, seTablaUsuarios] = useState([]);


  {/* funcion para insertar*/ }
  const InsertarUsuario = async (evento) => {
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
      codigo: codigo,
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

  const getListarUsuarios = async () => {
    conexionBaseDatos.collection("TBL_USUARIO").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs)
      seTablaUsuarios(docs);
    });

  };

  useEffect(() => {
    getListarUsuarios()
  }, [])

  const EliminarUsuario = async (id) => {
    await conexionBaseDatos.collection('TBL_USUARIO').doc(id).delete().then(() => {
      console.log("Registro eliminado exitosamente");
      toast("Registro eliminado exitosamente", {
        type: "error",
        autoClose: 2000
      });
    }).catch((error) => {
      console.error("No se puede eliminar el registro: ", error);
    });
  }
  const EditarUsuario = async (id) => {
    try {
      const dataUsuario = await conexionBaseDatos.collection("TBL_USUARIO").doc(id).get();
      const { codigo, nombre, cedula, telefono, email } = dataUsuario.data()
      setCodigo(codigo)
      setNombre(nombre)
      setCedula(cedula)
      setTelefono(telefono)
      setEmail(email)
      setModoEdicion(true)
    } catch (error) {
      console.error("El registro no se puede editar: ", error);
    }

  }


  const actualizarUsuario = async (id) => {
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
    const usuarioActualizado = {
      codigo: codigo,
      nombre: nombre,
      cedula: cedula,
      telefono: telefono,
      email: email
    }
    try {
      await conexionBaseDatos.collection("TBL_USUARIO").doc(id).get()
      console.error("Registro editado correcta: ");
      toast("Registro editado exitosamente", {
        type: "info",
      });
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 mt-5 mr-5">
          { /* comunicación entre componentes
          <div className="col-lg-4 mt-5 mr-5">
            <CrearUsuario {...{EditarUsuario, setNombre, tablaUsuarios }} />
          </div>
            */}
          <span >Crear Usuarios</span>
          <form onSubmit={modoEdicion ? actualizarUsuario : InsertarUsuario} className="form-group" >
            <div className="form-group row">
              <label htmlFor="idCodigo" className="col-sm-2 col-form-label">Código:</label>
              <div className="col-sm-10">
                <input type="text" maxLength="5" onChange={(ev) => { setCodigo(ev.target.value) }} className="form-control" id="idCodigo" value={codigo} placeholder="Ingrese el código"></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="idNombre" className="col-sm-2 col-form-label">Nombre:</label>
              <div className="col-sm-10">
                <input type="text" onChange={(ev) => { setNombre(ev.target.value) }} className="form-control" id="idNombre" value={nombre} placeholder="Ingrese el nombre del usuario"></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="idCedula" className="col-sm-2 col-form-label">Cedula:</label>
              <div className="col-sm-10">
                <input type="text" maxLength="10" onChange={(ev) => { setCedula(ev.target.value) }} className="form-control" id="idCedula" value={cedula} placeholder="Ingrese la cédula "></input>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="idTelefono" className="col-sm-2 col-form-label">Teléfono:</label>
              <div className="col-sm-10">
                <input type="text" maxLength="10" onChange={(ev) => { setTelefono(ev.target.value) }} className="form-control" id="idTelefono" value={telefono} placeholder="Ingrese el teléfono"></input>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="idEmail" className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-10">
                <input type="email" onChange={(ev) => { setEmail(ev.target.value) }} className="form-control" id="idEmail" value={email} placeholder="Ingrese el email"></input>
              </div>
            </div>
            {
              modoEdicion ?
                (<input className=" btn btn-primary btn-block" type="submit" value="Actualizar"></input>) :
                (<input className=" btn btn-primary btn-block" type="submit" value="Registrar"></input>)

            }

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
        <div className="col-lg-6  mt-5 ml-5">
          <span className="text.center" >Lista Usuarios</span>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id </th>
                <th scope="col">Nombre</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Cédula</th>
                <th scope="col">Email</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tablaUsuarios.map((indice) => (
                <tr key={indice.id}>
                  <td>{indice.codigo}</td>
                  <td>{indice.nombre}</td>
                  <td>{indice.telefono}</td>
                  <td>{indice.cedula}</td>
                  <td>{indice.email}</td>
                  <td>
                    <button onClick={() => EditarUsuario(indice.id)} className="btn btn-info btn-xs"><i>Editar</i></button>
                  </td>
                  <td>
                    <button onClick={() => EliminarUsuario(indice.id)} className="btn btn-danger"><i>Eliminar</i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ListaDeUsuarios;
