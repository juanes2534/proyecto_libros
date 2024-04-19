import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Aquí debes implementar la lógica de autenticación
  const token = localStorage.getItem("token") // Por ejemplo, puedes verificar si hay un token de autenticación en localStorage

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
};

export default ProtectedRoute;