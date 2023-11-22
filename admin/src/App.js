import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PaginaCriar from './pages/PaginaCriar';
import PaginaEditar from './pages/PaginaEditar';
import PaginaVer from './pages/PaginaTestes';
import PaginaDisciplina from './pages/PaginaDisciplinas';

function App() {
  return (
        <Routes>
          <Route path='/' element={<Layout/>}>

            <Route path='/criar' element={<PaginaCriar/>} />
            <Route path='/editar/:id' element={<PaginaEditar/>} />
            <Route path='/ver' element={<PaginaVer/>} />
            <Route path='/disciplinas' element={<PaginaDisciplina/>} />

          </Route>
        </Routes>
  );
}

export default App;
