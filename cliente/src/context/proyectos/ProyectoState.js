import React, {useReducer} from 'react'
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types/Index';
import clienteAxios from '../../config/axios';


const ProyectoState = (props) => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    //serie de funciones para el CRUD 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    //obtener los proyectos     
    const obtenerProyectos = async() => {
        try {
            const consulta = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: consulta.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta 
            });

        }
    }
    //agregar proyecto nuevo

    const agregarProyecto = async proyecto => {
        try {
            const consulta = await clienteAxios.post('/api/proyectos', proyecto);
            //agregamos el proyecto
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: consulta.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta 
            });

        }
  
    }

    //valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    //mostrar al proyecto seleccionado al dar click
    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta 
            });

        }
    }

    return(
        <ProyectoContext.Provider
            value = {{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarError,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    );
}
 
export default ProyectoState;