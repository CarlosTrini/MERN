import React, {Fragment, useContext} from 'react'
import Tareas from './Tareas';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {

    //extraemos lo necesarion del context de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //extraemos lo necesario del context de las tareas
    const tareaContext = useContext(TareaContext);
    const {tareasProyecto} = tareaContext;


    if (proyecto === null) return <h2>Selecciona un proyecto</h2>;
    const [proyectoActual] = proyecto;


    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0 
                    ? <li className="tarea sombra"> <p>No hay tareas</p> </li>
                    : 
                    <TransitionGroup>
                        {
                            tareasProyecto.map( tarea => (
                                <CSSTransition  
                                    key={tarea._id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tareas
                                        tarea={tarea}

                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar Proyecto &times; 
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;