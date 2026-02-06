import { Input } from '@/components/ui/input';
import { FileSearchCorner, ListFilter, Plus, TextSearch, User } from 'lucide-react';
import { useState } from 'react';
import { Carpentry } from './components/Carpentry';
import { Glassware } from './components';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useProduct } from '@/hooks/useProduct';

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Usuário')
  const [categorySectionId, setCategorySectionId] = useState<string>('1')
  const { listCategoriesSection } = useProduct()

  const categories = listCategoriesSection.filter(category => category.id ===
    Number(categorySectionId))

  return (
    <main className="w-full h-svh grid grid-cols-5 justify-center bg-neutral-100">
      <aside className="grid-cols-1 bg-white px-5 py-10">
        <h1 className="text-2xl font-semibold mb-10">Estoque AlvesGlass</h1>

        <div className="flex flex-col items-start justify-center">
          <ul className="w-full space-y-2">
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedMenu('Usuário')}>
              <User className="size-7" />
              Adicionar Usuário
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedMenu('Estoque')}>
              <TextSearch className='size-7' />
              Estoque            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-neutral-200 cursor-pointer"
              onClick={() => setSelectedMenu('Relatório')}
            >
              <FileSearchCorner className='size-7' />
              Relatório
            </li>
          </ul>
        </div>
      </aside>

      <section className='col-span-4 p-10'>
        <div className='w-full flex justify-between items-center'>
          <div className='w-2/3 space-y-2'>
            <p>Bem vindo ao sistema de estoque da AlvesGlass!</p>
            {
              selectedMenu === 'Usuário' &&
              <h1 className='text-3xl'>Adicionar Usuários</h1> ||
              selectedMenu === 'Estoque' &&
              <h1 className='text-3xl'>Estoque</h1> ||
              selectedMenu === 'Relatório' &&
              <h1 className='text-3xl'>Relatório</h1>
            }
          </div>

          <div className='flex justify-center items-center gap-4'>
            <span className='w-10 h-10 bg-white flex justify-center 
            items-center shadow rounded-lg cursor-pointer hover:bg-neutral-200'>
              <Plus className="size-6 " />
            </span>

            <Select onValueChange={setCategorySectionId}>
              <SelectTrigger className='bg-white py-5 rounded-lg'>
                <SelectValue placeholder={<ListFilter className="size-6" />} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    listCategoriesSection.map(category => {
                      return (
                        <SelectItem value={String(category.id)}>{category.name}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='mt-10'>
          <Input className='py-5 shadow bg-white' placeholder="Pesquise..." />
        </div>

        {
          selectedMenu === 'Usuário' && <p>Heloo</p> ||
          selectedMenu === 'Estoque' && (
            <div>
              {
                categorySectionId === '1' ? <Carpentry categories={categories} id={categorySectionId} /> :
                  <Glassware categories={categories} id={categorySectionId} />
              }
            </div>
          )
        }

      </section>
    </main>
  );
};
