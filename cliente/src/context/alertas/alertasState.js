import {useReducer} from 'react';
import alertasContext from './alertasContext';
import alertasReducer from './alertasReducer';
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/Index';

const AlertasState = (props) => {
   const initialState = {
      alerta: null
   };
   const [state, dispatch] = useReducer(alertasReducer, initialState);


   //funciones
   const mostrarAlerta = (msg, categoria) => {
      dispatch({
         type: MOSTRAR_ALERTA,
         payload: {
            msg, 
            categoria
         }
      });

      setTimeout(() => {
         dispatch({
            type: OCULTAR_ALERTA
         });
      }, 3000);
   }



   return (
      <alertasContext.Provider
         value = {{
            alerta: state.alerta,
            mostrarAlerta
         }}
      >
         {props.children}
      </alertasContext.Provider>
   );

}

export default AlertasState;

