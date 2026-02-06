
import type { GetCategorySectionProps } from "@/types/ProductsTypes"
import { Box } from "lucide-react"
import { useState } from "react"
import { useProduct } from "@/hooks/useProduct"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FormCreatedProduct, FormUpdateQuantity } from "@/components"

const ITEMS_PER_PAGE = 3
interface GlasswareProps {
  categories: GetCategorySectionProps[]
  id: string
}

export const Glassware = ({ categories, id }: GlasswareProps) => {
  const { listCategories } = useProduct()
  const [page, setPage] = useState(1)
  const [categoryId, setCategoryId] = useState('1')

  const listFiltered = categories.flatMap(section =>
    (section.categories || [])
      .filter(category => category.id === Number(categoryId))
      .flatMap(category => category.items || [])
  )

  console.log(listFiltered)

  const categoryFiltered = listCategories.filter(category =>
    category.category_section_id === Number(id))

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = listFiltered.slice(start, start + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(listFiltered.length / ITEMS_PER_PAGE)

  return (
    <div className='mt-5'>

      <Select onValueChange={setCategoryId}>
        <SelectTrigger className='bg-white py-5 rounded-lg'>
          <SelectValue placeholder='Selecione a categoria' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              categoryFiltered.map(category => {
                return (
                  <SelectItem value={String(category.id)}>{category.name}</SelectItem>
                )
              })
            }
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-3 mt-2">
        <p className="mb-1">Items Listados</p>
        {paginatedItems.map((item) => (
          <Dialog>
            <DialogTrigger asChild>
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl shadow p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Box className="text-blue-800" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {item.item_name}
                    </p>
                    <span className="text-sm text-neutral-500">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-7">
                  <span className="text-blue-800 font-bold text-xl">
                    {item.quantity}
                  </span>
                </div>


              </div>
            </DialogTrigger>

            <DialogContent>
              <FormUpdateQuantity id={item.id} />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* ⏮️ Paginação */}
      <div className="flex justify-between items-center mt-4" >
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </Button>

        <span className="text-sm text-neutral-500">
          Página {page} de {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Próximo
        </Button>
      </div >
    </div>
  )
}