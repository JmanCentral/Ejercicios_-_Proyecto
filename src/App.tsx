
import './App.css'

import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load de las páginas
const RegistroPage = lazy(() => import('./pages/RegistroUsuarioPage'))
const RegistroPacientePage = lazy(() => import('./pages/RegistroPacientePage'))
const EditarPacientePage = lazy(() => import('./pages/EditarPacientePage'))
const LoginPage = lazy(() => import('./pages/LoginUsuarioPage'))
const PacientePage = lazy(() => import('./pages/PacientesPage'))
const HistoriaClinicaPage = lazy(() => import('./pages/HistoriaCLinicaPage'))
const CrearHistoriaPage = lazy(() => import('./pages/CrearHistoriaPage'))
const EditarHistoriaPage = lazy(() => import('./pages/EditarHistoriaPage'))

// Este lo puedes mantener como eager si es pequeño o si se usa en todas las rutas
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Routes>
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/list/Pacientes" element={<ProtectedRoute><PacientePage /></ProtectedRoute>} />
        <Route path="/registro/Paciente" element={<ProtectedRoute><RegistroPacientePage /></ProtectedRoute>} />
        <Route path="/editar/Paciente/:id" element={<ProtectedRoute><EditarPacientePage /></ProtectedRoute>} />
        <Route path="/list/Historia/:id" element={<ProtectedRoute><HistoriaClinicaPage /></ProtectedRoute>} />
        <Route path="/crear/Historia/:id" element={<ProtectedRoute><CrearHistoriaPage /></ProtectedRoute>} />
        <Route path="/editar/Historia/:id" element={<ProtectedRoute><EditarHistoriaPage /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  )
}

export default App



