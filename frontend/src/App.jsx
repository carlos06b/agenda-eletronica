import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Agenda from './pages/Agenda';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/agenda"
        element={
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/agenda" replace />} />
    </Routes>
  );
}