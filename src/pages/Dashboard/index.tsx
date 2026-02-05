import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProduct } from '@/hooks/useProduct';
import { Box, FileSearchCorner, ListFilter, Plus, TextSearch, User } from 'lucide-react';
import { useState } from 'react';



const ITEMS_PER_PAGE = 3

export const Dashboard = () => {

  const [page, setPage] = useState(1)

  const { listProducts, listCategories } = useProduct()

  const start = (page - 1) * ITEMS_PER_PAGE
  const paginatedItems = listProducts.slice(start, start + ITEMS_PER_PAGE)

  const totalPages = Math.ceil(listProducts.length / ITEMS_PER_PAGE)
  return (
    <main className="w-full h-svh grid grid-cols-5 justify-center bg-neutral-100">
      <aside className="grid-cols-1 bg-white px-5 py-10">
        <h1 className="text-2xl font-semibold mb-10">Estoque AlvesGlass</h1>

        <div className="flex flex-col items-start justify-center">
          <ul className="w-full space-y-2">
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer">
              <User className="size-7" />
              Adicionar Usuário
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer">
              <TextSearch className='size-7' />
              Marcenaria
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer">
              <FileSearchCorner className='size-7' />
              Vidraçaria
            </li>
          </ul>
        </div>
      </aside>

      <section className='col-span-4 p-10'>
        <div className='w-full flex justify-between items-center'>
          <div className='w-2/3 space-y-2'>
            <p>Bem vindo ao sistema de estoque da AlvesGlass!</p>
            <h1 className='text-3xl'>Adicionar Usuários</h1>
          </div>

          <div className='flex justify-center items-center gap-4'>
            <span className='w-10 h-10 bg-white flex justify-center 
            items-center shadow rounded-lg cursor-pointer hover:bg-neutral-200'>
              <Plus className="size-6 " />
            </span>

            <ListFilter className="size-6" />
          </div>
        </div>

        <div className='mt-10'>
          <Input className='py-5 shadow bg-white' placeholder="Pesquise..." />
        </div>

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

      </section>
    </main>
  );
};
