import { useReducer } from "react";
import AuthReducer from "./authReducer";
import authContext from "./authContext";
import {REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, LOGIN_CERRAR} from '../../types/Index';
import clienteAxios from '../../config/axios';
import tokenAuth from "../../config/tokenAuth";


const AuthState = (props) => {
   
   const initialState = {
      token: localStorage.getItem('token'),
      autenticado: null,
      usuario: null,
      mensaje: null,
      cargando: true
   }
   const [state, dispatch] = useReducer(AuthReducer, initialState);


   const registrarUsuario = async (datos) => {
      try {
         const consulta = await clienteAxios.post('/api/usuarios', datos);
         dispatch({
            type: REGISTRO_EXITOSO,
            payload: consulta.data
         });
         //obtener usuario
         usuarioAutenticado();
      } catch (error) {
         //se arma la alerta que envía el context de alertas
         const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
         };
         dispatch({
            type: REGISTRO_ERROR,
            payload: alerta
         });
      }

   }

   //retorna el usuario autenticado 
   const usuarioAutenticado = async () => {
      const token = localStorage.getItem('token');
      if (token) {
         // funcion para enviar el token por headers
         tokenAuth(token);
      }

      try {
         const consulta = await clienteAxios.get('/api/auth/');
         dispatch({
            type: OBTENER_USUARIO,
            payload: consulta.data.usuario
         });
      } catch (error) {
         dispatch({
            type: LOGIN_ERROR
           });
      }
   }
   

   // cuando el usuario inicia sesion
   const iniciarSesion = async(datos) =>  {

      try {
         const consulta = await clienteAxios.post('/api/auth/', datos);
         dispatch({
            type: LOGIN_EXITOSO,
            payload: consulta.data
         });
         //obtener usuario
         usuarioAutenticado();         
      } catch (error) {
         console.log(error.response.data.msg);
         const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
         };
         dispatch({
            type: LOGIN_ERROR,
            payload: alerta
         });
      }
   }

   //CERRAR SESIÓN
   const cerrarSesion = () => {
      dispatch({
         type: LOGIN_CERRAR
      });
   }


   return (
      <authContext.Provider
         value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
         }}
      >
         {props.children}
      </authContext.Provider>
   );
}

export default AuthState;