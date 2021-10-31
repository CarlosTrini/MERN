import React, {useContext, useEffect} from 'react'
import authContext from '../../context/auth/authContext';


const Barra = () => {
    //context de autenticacipon
    const {usuario, usuarioAutenticado, cerrarSesion} = useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( 
        <header className="app-header">
            <p className="nombre-usuario"> Hola <span> {usuario ? usuario.nombre : 'user' } </span> </p>
            <nav className="nav-principal">
                <button className='btn btn-blank cerrar-sesion'
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;