import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/hooks/useProduct";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormUpdateQuantityProps {
  id: string;
}

// ===== ZOD =====
const schema = z.object({
  quantity: z.coerce.number().min(1, "Informe uma quantidade válida"),
});

type FormData = z.infer<typeof schema>;

export const FormUpdateQuantity = ({ id }: FormUpdateQuantityProps) => {
  const { listProducts, handleUpdateProduct } = useProduct();

  const product = listProducts.find(
    (product) => product.id === id
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (!product) return null;

  function onSubmit(data: FormData) {
    if (!product) return;
    handleUpdateProduct({
      ...product,
      quantity: product.quantity + data.quantity, // soma quantidade
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Acrescentar Item</h1>

      {/* Nome do produto (bloqueado) */}
      <Input
        className="text-sm bg-neutral-100 cursor-not-allowed"
        defaultValue={product.item_name}
        disabled
      />

      {/* Quantidade */}
      <Input
        className="text-sm"
        type="number"
        placeholder="Quantidade a adicionar"
        {...register("quantity")}
      />
      {errors.quantity && (
        <p className="text-red-500 text-xs">{errors.quantity.message}</p>
      )}

      <Button type="submit">Enviar</Button>
    </form>
  );
};
