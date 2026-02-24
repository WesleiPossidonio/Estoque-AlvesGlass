
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string
  name: string
  role: string
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