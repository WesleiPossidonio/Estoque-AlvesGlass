import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const confirmOrderLoginValidationSchema = z.object({
  email: z.email('Informe um E-mail válido'),
  password: z.string().min(6, 'Informe a Senha'),
});

export type OrderLoginData = z.infer<typeof confirmOrderLoginValidationSchema>;

type ConfirmOrderFormLoginData = OrderLoginData;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  });

  const { handleLoginUser } = useUser();

  const handleLogin = (data: ConfirmOrderFormLoginData) => {
    const { email, password } = data;

    const dataLogin = {
      email,
      password,
      typeSessions: 'user',
    };
    handleLoginUser(dataLogin);
    reset();
  };

  return (
    <main className="w-full h-svh flex flex-col items-center justify-center">
      <form
        className="h-80 w-[90%] md:w-[80%] lg:w-[30rem] flex flex-col 
        items-center justify-center space-y-3 p-4 bg-neutral-100"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-2xl font-bold mb-8">Login</h1>
        <Input
          className="bg-white shadow"
          type="text"
          placeholder="E-mail"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs self-start">
            {errors.email.message}
          </p>
        )}
        <Input
          className="bg-white shadow"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500 text-xs self-start">
            {errors.password.message}
          </p>
        )}

        <Button
          className="w-full text-md font-semibold shadow"
          type="submit"
        >
          Entrar
        </Button>

        <div className="w-full flex items-center justify-start gap-1">
          <span className="text-sm text-neutral-600">Esqueci senha?</span>
          <p className="text-sm text-neutral-600 font-semibold">Sim</p>
        </div>
      </form>
    </main>
  );
};
