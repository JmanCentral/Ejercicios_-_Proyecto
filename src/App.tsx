
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegistroPage from './pages/RegistroUsuarioPage'
import LoginPage from './pages/LoginUsuarioPage'
import UserListPage from './pages/UserListPage'
import PacientePage from './pages/PacientesPage'
import PacienteDetallesPage from './pages/PacienteDetallesPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (

    <Routes>  
      <Route path="/registro" element={<RegistroPage/>} />

      <Route path="/" element={<LoginPage/>} />
      <Route path="/list" element={
         <ProtectedRoute rolesPermitidos={['usuario']}><UserListPage/></ProtectedRoute>} />
      <Route path="/list/Pacientes" element={<ProtectedRoute rolesPermitidos={['admin']}><PacientePage/></ProtectedRoute>} />
      <Route path="/Pacientes/:id" element={<ProtectedRoute rolesPermitidos={['admin']}><PacienteDetallesPage/></ProtectedRoute>} />
    </Routes>

  )
}

export default App



