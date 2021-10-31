import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //obtener el context de tareas
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    //obtener el id para mostrar el proyecto y sus tareas
    function obtenerId(id){
        proyectoActual(id);
        obtenerTareas(id);
    }

    return ( 
        <li>
            <button 
                type="button"
                className="btn btn-blank "
                onClick={() => obtenerId(proyecto._id)}
            >
            {proyecto.nombre}
            </button >
        </li>
     );
}
 
export default Proyecto;