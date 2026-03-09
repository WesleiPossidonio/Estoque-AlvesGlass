import { useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../ui/popover'

import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '../ui/command'

import { Plus, Search } from 'lucide-react'
import { useProduct } from '@/hooks/useProduct'

interface ClientWithdrawalFormProps {
  clientId: string
}

export const clientWithdrawalSchema = z.object({
  withdrawn_by: z.string().min(1, 'Obrigatório'),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        item_id: z.string().uuid('Produto inválido'),
        quantity: z.number().min(1, 'Qtd mínima 1'),
      }),
    )
    .min(1, 'Adicione pelo menos um item'),
})

export type ClientWithdrawalFormData = z.infer<
  typeof clientWithdrawalSchema
>

export const ClientWithdrawalForm = ({ clientId }: ClientWithdrawalFormProps) => {
  const { listProducts, handleClientWithdrawals } = useProduct()
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    item_name: string
  } | null>(null)
  const [quantity, setQuantity] = useState(1)

  const form = useForm<ClientWithdrawalFormData>({
    resolver: zodResolver(clientWithdrawalSchema),
    defaultValues: {
      items: [],
    },
  })

  const { control, register, handleSubmit, formState } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const handleAddItem = () => {
    if (!selectedItem || quantity < 1) return

    append({
      item_id: selectedItem.id,
      quantity,
    })

    setSelectedItem(null)
    setQuantity(1)
    setSearch('')
  }

  const filteredItems = listProducts.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleExitProducts = (data: ClientWithdrawalFormData) => {
    const payload = {
      ...data,
      client_id: clientId,
    }

    handleClientWithdrawals(payload)
  }

  return (
    <form
      onSubmit={handleSubmit(handleExitProducts)}
      className="space-y-4 mt-5"
    >
      <div className='space-y-4'>
        <h3 className="font-semibold">Dados do Cliente</h3>
        <div>
          <Input type='text' placeholder='Responsável pela retirada' {...register('withdrawn_by')} />
          {errors.withdrawn_by && (
            <p className="text-sm text-red-500">
              {errors.withdrawn_by.message}
            </p>
          )}
        </div>

        <div>
          <Textarea placeholder='Descreva sobre o projeto...' {...register('note')} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Lista de Itens</h3>

        <div className="flex gap-2 items-end">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center border rounded-md px-3 py-2 cursor-text w-full">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedItem?.item_name || 'Buscar produto...'}
                </span>
              </div>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[320px]">
              <Command>
                <CommandInput
                  placeholder="Digite o nome do produto..."
                  value={search}
                  onValueChange={(value) => setSearch(value)}
                />
                <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                <CommandGroup>
                  {filteredItems.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.item_name}
                      onSelect={() => {
                        setSelectedItem(item)
                        setSearch(item.item_name)
                      }}
                    >
                      {item.item_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div>
            <label className="text-sm">Qtd</label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="w-24"
            />
          </div>

          <Button
            type="button"
            onClick={handleAddItem}
            disabled={!selectedItem || quantity < 1}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          {fields.map((field, index) => {
            const item = listProducts.find((i) => i.id === field.item_id)
            return (
              <div
                key={field.id}
                className="flex items-center justify-between border rounded-md p-3"
              >
                <div>
                  <p className="font-medium">{item?.item_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantidade: {field.quantity}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => remove(index)}
                >
                  Remover
                </Button>
              </div>
            )
          })}
        </div>

        {errors.items && (
          <p className="text-sm text-red-500">
            {errors.items.message}
          </p>
        )}
      </div>

      <Button className="w-full">
        Registrar saída
      </Button>
    </form>
  )
}