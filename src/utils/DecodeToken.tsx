
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  role: string
  email: string
  name: string
}

export const decodeToken = (token: unknown): JwtPayload | null => {

  if (typeof token !== 'string' || !token.trim()) return null;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error('Erro ao decodificar o token', error);
    return null;
  }
};