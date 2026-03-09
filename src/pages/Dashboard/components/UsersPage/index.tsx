import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useUser } from "@/hooks/useUser"
import { Trash, User } from "lucide-react"
import { useState } from "react"
const ITEMS_PER_PAGE = 6


interface UserProps {
  userName: string
}

export const UsersPage = ({ userName }: UserProps) => {
  const { listUsers, handleDeleteUser } = useUser()
  const [page, setPage] = useState(1)

  const clients = userName ? listUsers.filter(user => user.name.toLowerCase()
    .includes(userName.toLowerCase())) : listUsers

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedUsers = clients.length > 0 ? clients.slice(start, start + ITEMS_PER_PAGE)
    : listUsers.slice(start, start + ITEMS_PER_PAGE)
  const totalPages = clients.length > 0 ? Math.ceil(clients.length / ITEMS_PER_PAGE)
    : Math.ceil(listUsers.length / ITEMS_PER_PAGE)

  return (
    <section>
      <div className="mt-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-neutral-400 font-semibold bg-neutral-50 
             border shadow hover:bg-neutral-100 hover:text-neutral-600 cursor-pointer">
              Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <p>Formulário de Adição de Usuário</p>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3 mt-2 cursor-pointer">
        <p className="mb-1">Items Listados</p>
        {paginatedUsers.map((user) => (

          <div
            key={user.id}
            className=" z-20 flex items-center justify-between bg-white rounded-xl shadow p-4 hover:bg-neutral-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <User className="text-blue-800" />
              </div>

              <div>
                <Dialog>
                  <DialogTrigger className="w-full" asChild>
                    <p className="font-semibold text-sm">
                      {user.name}
                    </p>
                  </DialogTrigger>

                  <DialogContent className="md:max-w-none w-[70%]">
                    <p>Heloo</p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Trash className="text-red-500 z-50" onClick={() => handleDeleteUser(user.id)} />
          </div>
        ))
        }
      </div>


      {/* ⏮️ Paginação */}
      < div className="flex justify-between items-center mt-4" >
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
    </section >
  )
}


