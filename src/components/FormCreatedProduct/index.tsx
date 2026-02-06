import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useProduct } from "@/hooks/useProduct";

const formCreateProductSchema = z.object({
  item_name: z.string().min(2, "Informe o nome do produto"),
  category_id: z.string().min(1, "Selecione uma categoria"),
  unit: z.string().min(1, "Informe a unidade"),
  code: z.string().min(3, "Informe o código do produto"),
  quantity: z.coerce.number().min(1, "Quantidade inválida"),
  min_quantity: z.coerce.number().min(0),
  locationv: z.string().min(2, "Informe a localização"),
  control_level: z.string().min(1, "Selecione uma opção"),
  sector_name: z.string().min(2, "Informe o setor"),
});

export const FormCreatedProduct = () => {
  const { handleCreateProduct, listCategories } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formCreateProductSchema),
  });

  const handleCreatedProduct = (data: z.infer<typeof formCreateProductSchema>) => {
    const dataList = { ...data, category_id: Number(data.category_id) }
    handleCreateProduct(dataList)
  }

  return (
    <form onSubmit={handleSubmit(handleCreatedProduct)} className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Adicionar novo item ao estoque</h1>

      {/* Nome */}
      <Input className='text-sm' placeholder="Nome do Produto" {...register("item_name")} />
      {errors.item_name && (
        <p className="text-red-500 text-xs">{errors.item_name.message}</p>
      )}

      {/* Categoria */}
      <Select onValueChange={(value) => setValue("sector_name", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecionar setor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listCategories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.sector_name && (
        <p className="text-red-500 text-xs">{errors.sector_name.message}</p>
      )}


      {/* Categoria */}
      <Select onValueChange={(value) => setValue("category_id", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecionar categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listCategories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.category_id && (
        <p className="text-red-500 text-xs">{errors.category_id.message}</p>
      )}

      {/* Unidade */}
      <Input className='text-sm' placeholder="Unidade (ex: un, kg, cx)" {...register("unit")} />
      {errors.unit && (
        <p className="text-red-500 text-xs">{errors.unit.message}</p>
      )}

      {/* Código / Código de Barras */}
      <Input className='text-sm' placeholder="Código do Produto" {...register("code")} />
      {errors.code && (
        <p className="text-red-500 text-xs">{errors.code.message}</p>
      )}

      {/* Quantidade */}
      <Input className='text-sm'
        type="number"
        placeholder="Quantidade"
        {...register("quantity")}
      />
      {errors.quantity && (
        <p className="text-red-500 text-xs">{errors.quantity.message}</p>
      )}

      {/* Quantidade mínima */}
      <Input className='text-sm'
        type="number"
        placeholder="Quantidade mínima"
        {...register("min_quantity")}
      />

      {/* Localização */}
      <Input className='text-sm' placeholder="Localização" {...register("locationv")} />
      {errors.locationv && (
        <p className="text-red-500 text-xs">{errors.locationv.message}</p>
      )}

      {/* Nível de controle */}
      <Select onValueChange={(value) => setValue("control_level", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nível de controle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FREE">Livre</SelectItem>
          <SelectItem value="RESTRICTED">Restrito</SelectItem>
        </SelectContent>
      </Select>
      {errors.control_level && (
        <p className="text-red-500 text-xs">{errors.control_level.message}</p>
      )}

      <Button type="submit">Cadastrar Produto</Button>
    </form>
  );
};
