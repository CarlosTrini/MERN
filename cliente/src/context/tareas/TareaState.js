import React, {useReducer} from 'react'
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import {OBTENER_TAREAS, GUARDAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA,SELECCIONAR_TAREA, EDITAR_TAREA} from '../../types/Index'
import clienteAxios from '../../config/axios'

const TareaState = props => {

    //ESTADO INICIAL
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaAEditar: null
    }

    //DISPATCH PARA EJECUTAR LAS ACCIONES
    const [state, dispatch] = useReducer(TareaReducer, initialState);


    //AQUI FUNCIONES PARA LAS ACCIONES CON DISPATCH
    const obtenerTareas = async(proyectoId) =>{
        try {
            const consulta = await clienteAxios.get(`/api/tareas/${proyectoId}`);
            dispatch({
                type: OBTENER_TAREAS,
                payload: consulta.data
            });
            
        } catch (error) {
            console.log(error.response);
        }
    }

    const agregarTarea = async (tarea) =>{
        try {
            clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type:GUARDAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    function validarTarea(){
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error.response);
        }
        
    }
    
    function cambiarEstadoTarea(tarea) {
        dispatch({
            type:ESTADO_TAREA,
            payload: tarea
        });
    }

    //selecciona la tarea a editar para poder ser mostrada y editada
    const seleccionarTarea = (tarea) => {
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: tarea
        });
    }

    const editarTarea = async(tarea) => {
        console.log(tarea);
        const id = tarea._id;
        try {
            await clienteAxios.put(`/api/tareas/${id}`, tarea);
            dispatch({
                type: EDITAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return ( 
        <TareaContext.Provider
            value = {{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaAEditar: state.tareaAEditar,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                seleccionarTarea,
                editarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
     );
}
 
export default TareaState;