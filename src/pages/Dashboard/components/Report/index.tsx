

import { ArrowDownUp, Box } from "lucide-react"
import { useState } from "react"
import { useProduct } from "@/hooks/useProduct"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InfoReport } from "@/components/InfoReport"

const ITEMS_PER_PAGE = 5

interface ReportProps {
  search: string
}

export const Report = ({ search }: ReportProps) => {
  const { listStockMovements } = useProduct()
  const [page, setPage] = useState(1)

  const stockMovementsFiltered = listStockMovements.filter(item =>
    item.item_name_snapshot
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = stockMovementsFiltered.length > 0 ?
    stockMovementsFiltered.slice(start, start + ITEMS_PER_PAGE) :
    listStockMovements.slice(start, start + ITEMS_PER_PAGE)

  const totalPages = Math.ceil(stockMovementsFiltered.length > 0 ?
    stockMovementsFiltered.length / ITEMS_PER_PAGE : listStockMovements.length / ITEMS_PER_PAGE)


  return (
    <div className='mt-5'>

      <div className="flex flex-col gap-3 mt-2 cursor-pointer">
        <p className="mb-1">Items Listados</p>
        {paginatedItems.map((item) => (

          <Dialog>
            <DialogTrigger className="w-full" asChild>
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl shadow p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.movement_type === 'IN'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                      }`}
                  >
                    <Box
                      className={
                        item.movement_type === 'IN'
                          ? 'text-green-800'
                          : 'text-red-800'
                      }
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {item.item?.item_name}
                    </p>
                    <div className="space-x-2">
                      <span className="text-sm text-neutral-500">
                        {item.withdrawn_by || item.added_by}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-7">
                  <span className={
                    item.movement_type === 'IN'
                      ? 'text-green-800 font-bold'
                      : 'text-red-800 font-bold'
                  }>
                  </span>
                  {
                    item.movement_type === 'IN' ?
                      <ArrowDownUp className="text-green-600" /> :
                      <ArrowDownUp className="text-red-700" />
                  }

                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="md:max-w-none w-[70%]" >
              <InfoReport reportID={item.id} />
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
    </div >
  )
}