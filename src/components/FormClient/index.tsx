import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/hooks/useProduct";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  name: z.string().min(1, "Informe um nome válido"),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>;

export const FormClient = () => {
  const { } = useProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleAddClient(data: FormData) {

  }


  return (
    <form onSubmit={handleSubmit(handleAddClient)} className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Adicionar Cliente</h1>

      <Input
        className="text-sm bg-neutral-100 cursor-not-allowed"
        type="text"
        placeholder="Nome do cliente"
        {...register("name")}
      />

      {errors.name && (
        <p className="text-red-500 text-xs">{errors.name.message}</p>
      )}

      <Input
        className="text-sm"
        type="text"
        placeholder="Observações do cliente"
        {...register("notes")}
      />
      {errors.notes && (
        <p className="text-red-500 text-xs">{errors.notes.message}</p>
      )}

      <Button type="submit">Enviar</Button>

    </form>
  );
};
