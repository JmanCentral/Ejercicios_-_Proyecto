
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegistroPage from './pages/RegistroUsuarioPage'
import RegistroPacientePage from './pages/RegistroPacientePage'
import EditarPacientePage from './pages/EditarPacientePage'
import LoginPage from './pages/LoginUsuarioPage'
import PacientePage from './pages/PacientesPage'
import ProtectedRoute from './routes/ProtectedRoute'
import HistoriaClinicaPage from './pages/HistoriaCLinicaPage'


function App() {

  return (

    <Routes>  
      <Route path="/registro" element={<RegistroPage/>} />
      <Route path="/" element={<LoginPage/>} />
      <Route path="/list/Pacientes" element={<ProtectedRoute><PacientePage/></ProtectedRoute>} />
      <Route path="/registro/Paciente" element={<ProtectedRoute><RegistroPacientePage/></ProtectedRoute>} />
      <Route path="/editar/Paciente/:id" element={<ProtectedRoute><EditarPacientePage/></ProtectedRoute>} />
      <Route path="/list/Historia/:id" element={<ProtectedRoute><HistoriaClinicaPage/></ProtectedRoute>} />
    </Routes>

  )
}

export default App



