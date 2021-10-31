import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertasState from './context/alertas/alertasState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';


//revisar si existe un token en localStorage
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);  
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertasState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertasState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
