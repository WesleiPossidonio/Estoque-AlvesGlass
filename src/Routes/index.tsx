import { ExitPage, Login } from '@/pages';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './privateRoutes';

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ExitPage />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/dashboard-admin"
        element={<PrivateRoutes />}
      ></Route>
    </Routes>
  );
};
