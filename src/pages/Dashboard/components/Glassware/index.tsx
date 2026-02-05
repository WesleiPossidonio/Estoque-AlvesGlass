import { Button } from "@/components/ui/button"
import { useProduct } from "@/hooks/useProduct"
import { Box } from "lucide-react"
import { useState } from "react"

const ITEMS_PER_PAGE = 3

export const Glassware = () => {

  const [page, setPage] = useState(1)

  const { listProducts } = useProduct()

  const listFiltered = listProducts.filter(list => list.sector_name === 'Vidraçaria')

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = listFiltered.slice(start, start + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(listFiltered.length / ITEMS_PER_PAGE)

  return (
    <div className='mt-5'>
      {/* 📦 Lista estilo imagem */}
      <div className="flex flex-col gap-3 mt-2">
        <p className="mb-1">Items Listados</p>
        {paginatedItems.map((item) => (
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
                <span className="text-xs text-neutral-400">
                  {item.unit}
                </span>
              </div>
            </div>

            <span className="text-blue-800 font-bold text-xl">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* ⏮️ Paginação */}
      <div className="flex justify-between items-center mt-4">
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
      </div>
    </div>
  )
}