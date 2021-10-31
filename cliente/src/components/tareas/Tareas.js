import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Tareas = ({ tarea }) => {

    //context de los proyectos
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext;
    //proyecto es: {[datos]} para evitar hacer: proyecto[0].id... aplicar destruction
    const [proyectoActual] = proyecto;


    //context de las tareas
    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, seleccionarTarea, editarTarea} = tareasContext ;

    //función para eliminar la tarea y actualizar el listado de las tareas
    function tareaEliminar(id){
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }


    //función para actualizar el estado de la tarea
    function cambiarEstado(tarea) {
        //si es true pasa a false y viceversa
        console.log(tarea);
        tarea.estado = !tarea.estado;
        editarTarea(tarea);
    }


    //función para seleccinar la tarea a editar
    function tareaSeleccionada(tarea) {
        seleccionarTarea(tarea);
    }

    return (
        <li className="tarea sombra">
            <p> {tarea.nombre} </p>

            <div className="estado">
                {
                    tarea.estado
                        ? (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >
                            Completo</button>
                        )
                        :(
                          <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                          >
                          Incompleto</button>  
                        )
                }
            </div>
            <div className="acciones">
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={() => tareaSeleccionada(tarea)}
                    >Editar</button>

                    <button
                        type="button"
                        className="btn btn-eliminar"
                        onClick={() => tareaEliminar(tarea._id)}
                    >Eliminar</button>
            </div>
        </li>
    );
}

export default Tareas;