import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Obtenemos el token para saber si ya el usuario se autentifico
  const token = localStorage.getItem("token") 

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
};

export default ProtectedRoute;