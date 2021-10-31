// IMPORTAR LAS ACCIONES
import {OBTENER_TAREAS, GUARDAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, SELECCIONAR_TAREA, EDITAR_TAREA} from '../../types/Index';


// CREAR EL REDUCER
const TareaReducer = (state, action) =>{
    switch(action.type){
        case OBTENER_TAREAS: 
            return {
                ...state,
                tareasProyecto: action.payload
            }
        case GUARDAR_TAREA:
            return{
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(t => t._id !== action.payload)
            }
        case ESTADO_TAREA:
        case EDITAR_TAREA: 
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(t => t._id === action.payload._id ? action.payload : t),
                tareaAEditar: null
            }
        case SELECCIONAR_TAREA: 
            return {
                ...state,
                tareaAEditar: action.payload
            }
        default: 
            return state;
        
    }
}

export default TareaReducer;