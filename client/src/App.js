import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Categorias from './Pages/Categorias';
import Login from './Pages/Login';
import Libro from './Pages/Libro';
import Registro from './Pages/registro';
import ProtectedRoute from './Pages/rutasProtegidas.jsx';
import InicioAdmin from './Pages/inicioAdmin.jsx';
import CrearAdmin from './Pages/crearAdmin.jsx';
import CrearLibro from './Pages/crearLibro.jsx';
import Estadisticas from './Pages/estadisticas.jsx';
import Descargas from './Pages/descargas.jsx';

const OutletComponent = () => (
  <Routes>
    <Route path='*' element={<Inicio />} />
    <Route path='/categorias' element={<Categorias />} />
    <Route path='/login' element={<Login />} />
    <Route path='/registro' element={<Registro />}></Route>
    <Route path='/libro/:titulo' element={<Libro />}></Route>
    <Route path='/descargas' element={<Descargas />} />
  </Routes>
);

const AdminOutlet = () => (
  <Routes>
    <Route path="*" element={<InicioAdmin />} />
    <Route path="/crearAdmin" element={<CrearAdmin />} />
    <Route path="/crearLibro" element={<CrearLibro />} />
    <Route path="/estadisticas" element={<Estadisticas />} />
  </Routes>
  // <Admin></Admin>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <RenderNavbar />
        <div>
          <Routes>
            <Route path='*' element={<OutletComponent />}></Route>
            <Route path='/admin/*' element={<ProtectedRoute>
              <AdminOutlet></AdminOutlet>
            </ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
const RenderNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const rutasAdmin = currentPath.startsWith('/admin');
  // Verificamos si la ruta actual es diferente de "/admin"
  if (!rutasAdmin) {
    return <Navbar />;
  }
  // Si es "/admin", no renderizamos Navbar
  return null;
}

export default App;
