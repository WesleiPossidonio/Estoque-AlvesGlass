import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/hooks/useProduct";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useUser } from "@/hooks/useUser";
import { DialogClose } from "../ui/dialog";

interface FormUpdateQuantityProps {
  id: string;
}

const schema = z.object({
  quantity: z.coerce.number().min(1, "Informe uma quantidade válida"),
  movement_type: z.enum(["IN", "OUT"]),
})

type FormData = z.infer<typeof schema>;

export const FormUpdateQuantity = ({ id }: FormUpdateQuantityProps) => {
  const { listProducts, handleCreateStockMovement } = useProduct();
  const { userDataLogin } = useUser()

  const product = listProducts.find(
    (product) => product.id === id
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (!product) return null;

  const nameUser = userDataLogin.name

  function onSubmit(data: FormData) {
    const isAuthenticated = Boolean(userDataLogin?.token)

    if (isAuthenticated) {
      handleCreateStockMovement({
        ...data,
        item_id: id,
      })
      return
    }


    if (data.movement_type === 'OUT') {
      handleCreateStockMovement({
        ...data,
        item_id: id,
        withdrawn_by: nameUser,
      })
      return
    }

    handleCreateStockMovement({
      ...data,
      item_id: id,
    })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl text-base-blue font-semibold">Acrescentar Item</h1>
        <p className="text-sm text-neutral-500">Preencha o formulário para fazer uma movimentação</p>
      </div>

      <Input
        className="text-sm bg-neutral-100 cursor-not-allowed"
        defaultValue={product.item_name}
        disabled
      />

      <Controller
        name="movement_type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de movimentação" />
            </SelectTrigger>

            <SelectContent className='w-full'>
              <SelectGroup>
                <SelectItem value="IN">Entrada</SelectItem>
                <SelectItem value="OUT">Saída</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.movement_type && (
        <p className="text-red-500 text-xs">{errors.movement_type.message}</p>
      )}

      <Input
        className="text-sm"
        type="number"
        placeholder="Quantidade a adicionar"
        {...register("quantity")}
      />
      {errors.quantity && (
        <p className="text-red-500 text-xs">{errors.quantity.message}</p>
      )}
      <DialogClose className="self-start">
        <Button className="w-32 text-md font-semibold py-5 bg-base-blue hover:bg-base-blue/90 text-white cursor-pointer" type="submit">Enviar</Button>
      </DialogClose>
    </form>
  );
};
