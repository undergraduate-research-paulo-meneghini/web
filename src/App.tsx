import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MotherRegistrationPage from './pages/MotherRegistrationPage';
import ContentManagementPage from './pages/ContentManagementPage';
import ContentFormPage from './pages/ContentFormPage';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastro-mae"
            element={
              <ProtectedRoute>
                <MotherRegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gerenciar-conteudo"
            element={
              <ProtectedRoute>
                <ContentManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gerenciar-conteudo/novo"
            element={
              <ProtectedRoute>
                <ContentFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gerenciar-conteudo/:id/editar"
            element={
              <ProtectedRoute>
                <ContentFormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
