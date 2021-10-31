import {REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, LOGIN_CERRAR} from '../../types/Index';

const AuthReducer = (state, action) => {
   switch (action.type) {
      case LOGIN_EXITOSO:
      case REGISTRO_EXITOSO:
         localStorage.setItem('token', action.payload.token);
         return {
            ...state,
            autenticado: true,
            mensaje: null,
            cargando:false
         };

      case LOGIN_CERRAR:
      case REGISTRO_ERROR:
      case LOGIN_ERROR:
         localStorage.removeItem('token');
         return {
            ...state, 
            token: null,
            mensaje: action.payload,
            usuario: null,
            autenticado: null,
            cargando:false

         }

      case OBTENER_USUARIO:
         return {
            ...state,
            usuario: action.payload,
            autenticado: true,
            cargando:false

         }


      default:
         return state;
   }
}

export default AuthReducer;