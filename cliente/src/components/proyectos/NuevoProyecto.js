import React, { Fragment, useState, useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    const proyectosContext = useContext(ProyectoContext);

    const {formulario , errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });
    const {nombre} = proyecto;

    //obtener el nombre del proyecto
    const capturarNombre = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        });
    }

    //revisar campos al hacer submit
    const revisarCampos = (e) => {
        e.preventDefault();

        //validar 
        if(nombre.trim() === ''){
            mostrarError();
            return;
        }
        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar el form
        setProyecto({
            nombre: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primario btn-block"
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
            {
                !formulario 
                ? null
                :(
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={revisarCampos}
                    >
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombreProyecto" 
                            placeholder="Nombre de tu proyecto" 
                            className="input-text"
                            onChange={capturarNombre}
                            value={nombre}        
                        />
        
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Agregar Nuevo Proyecto"
                        />
                    </form>

                
                )
            }

            {
                errorformulario
                ? <p className="mensaje error">AGREGA DATOS AL CAMPO</p>
                :null
            }
        </Fragment>
    );
}

export default NuevoProyecto;