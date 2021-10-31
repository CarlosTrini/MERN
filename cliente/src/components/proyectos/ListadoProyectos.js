import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import alertasContext from '../../context/alertas/alertasContext'

const ListadoProyectos = () => {

    const proyectoContext = useContext(ProyectoContext);
    const {proyectos, obtenerProyectos, mensaje} = proyectoContext;

    const {alerta, mostrarAlerta} = useContext(alertasContext);


    //obtener proyectos al cargar el componente
    useEffect(() => {

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length === 0 ) return <p className='mensaje error'>No hay proyectos, crea uno</p>;
    
    return ( 
        <ul className="listado-proyectos">
            {
                    alerta ? 
                    (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :
                     null
            }
            <TransitionGroup>
                {
                    proyectos.map( proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto proyecto={proyecto}/>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;