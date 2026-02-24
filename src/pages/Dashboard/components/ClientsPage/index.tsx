import { FormClient } from "@/components"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useProduct } from "@/hooks/useProduct"
import { Users } from "lucide-react"
import { useState } from "react"

const ITEMS_PER_PAGE = 6

interface ClientProps {
  name: string
}

export const ClientsPage = ({ name }: ClientProps) => {
  const { listClients } = useProduct()
  const [page, setPage] = useState(1)

  const clients = name ? listClients.filter(client => client.name.toLowerCase()
    .includes(name.toLowerCase())) : listClients

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = clients.length > 0 ? clients.slice(start, start + ITEMS_PER_PAGE)
    : listClients.slice(start, start + ITEMS_PER_PAGE)
  const totalPages = clients.length > 0 ? Math.ceil(clients.length / ITEMS_PER_PAGE)
    : Math.ceil(listClients.length / ITEMS_PER_PAGE)

  return (
    <section className='w-full'>
      <div className="mt-3">
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="font-semibold cursor-pointer">Adicionar Clientes</h2>
          </DialogTrigger>

          <DialogContent>
            <FormClient />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3 mt-2 cursor-pointer">
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
                    <Users className="text-blue-800" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {item.name}
                    </p>
                    <span className="text-sm text-neutral-500">
                      {item.notes}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent>
              <p>Helooo</p>
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
    </section>
  )
}


