import { Navigate, Outlet } from 'react-router-dom';
import { decodeToken } from '@/utils/DecodeToken';

export const PrivateRoutes = () => {
  const token = localStorage.getItem('EstoqueAlvesClass:userData1.0');

  const dataUser = decodeToken(token);

  return token !== null && dataUser?.role === 'admin' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};
