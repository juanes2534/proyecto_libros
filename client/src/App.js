import Navbar from './Components/Navbar/Navbar';
// import imagen from './libros/'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Categorias from './Pages/Categorias';
import Login from './Pages/Login';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/categorias" element={<Categorias/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
