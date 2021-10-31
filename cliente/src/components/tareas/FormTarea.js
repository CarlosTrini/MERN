import React, {useContext, useEffect, useState} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    // context de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //context de tareas
    const tareasContext = useContext(TareaContext);
    const {errorTarea, agregarTarea, validarTarea, obtenerTareas, tareaAEditar, editarTarea} = tareasContext;
   
    
    //se usa useEffect para revisar si existe  o no  una tarea a editar
    useEffect(() => {
        tareaAEditar !== null ? setTarea(tareaAEditar) : setTarea({nombre: ''});
    }, [tareaAEditar])
    
    //useState para almacenar la tarea nueva
    const [tarea, setTarea] = useState({
        nombre: ''
    });
    const {nombre} = tarea;
    

    if (proyecto === null) return null;

    //para mantener la referencia del proyecto al cual se le asignará la tarea
    //destructuring al proyecto
    const [proyectoActual] = proyecto;
    


    //función para capturar el nombre de la tarea
    function obtenerTarea(e){
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }


    //función para almacenar la tarea
    function onSubmit(e) {
        e.preventDefault();

        //validar tarea
        if(!nombre.trim()){
            validarTarea();
            return;
        }

        //revisar si es tarea nueva o edición de tarea
        if(tareaAEditar === null){
            //completar datos de la tarea y agregar la nueva tarea al state
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            editarTarea(tarea);
        }
        
        //obtener las tareas nuevamente para que se muestre la nueva tarea agregada
        obtenerTareas(proyectoActual.id);

        //reset al formulario
        setTarea({nombre: ''});
    }



    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"  
                        name="nombre"
                        placeholder="Nombre de la Tarea..."
                        className="input-text"
                        value= {nombre}
                        onChange={obtenerTarea}
                    />
                </div>

                <div className="">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaAEditar ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {
                errorTarea ? 
                <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                :
                null
            }
        </div>
    );
}

export default FormTarea;