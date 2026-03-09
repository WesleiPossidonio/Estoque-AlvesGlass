import { useProduct } from '@/hooks/useProduct';
import { useState } from 'react';
import { Glassware, Carpentry, ClientsPage, UsersPage } from './components';
import { Input } from '@/components/ui/input';
import { Report } from './components/Report';

import {
  FileSearchCorner,
  ListFilter,
  TextSearch,
  User,
  Users
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import Logo from '@/assets/Logo2.png'

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('Usuário')
  const [categorySectionId, setCategorySectionId] = useState<string>('1')
  const { listCategoriesSection } = useProduct()

  const [searchItems, setSearchItems] = useState('')

  const categories = listCategoriesSection.filter(category => category.id ===
    Number(categorySectionId))

  return (
    <main className="w-full h-svh grid grid-cols-5 justify-center bg-neutral-100">
      <aside className="grid-cols-1 bg-white px-5 py-10">
        <img src={Logo} alt="Logo" className='w-26 mb-8' />

        <div className="flex flex-col items-start justify-center ">
          <ul className="w-full space-y-2">
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-base-blue hover:text-white group cursor-pointer"
              onClick={() => setSelectedMenu('Usuário')}>
              <User className="size-7 group-hover:text-white" />
              Usuários
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-base-blue hover:text-white group cursor-pointer"
              onClick={() => setSelectedMenu('Clients')}
            >
              <Users className='size-7 group-hover:text-white' />
              Clientes
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-base-blue hover:text-white group cursor-pointer"
              onClick={() => setSelectedMenu('Estoque')}>
              <TextSearch className='size-7 group-hover:text-white' />
              Estoque
            </li>
            <li className="w-full p-3 rounded-lg text-lg font-semibold flex 
             items-center gap-3 hover:bg-base-blue hover:text-white group cursor-pointer"
              onClick={() => setSelectedMenu('Relatório')}
            >
              <FileSearchCorner className='size-7 group-hover:text-white' />
              Relatório
            </li>
          </ul>
        </div>
      </aside>

      <section className='col-span-4 p-10'>
        <div className='w-full flex justify-between items-center'>
          <div className='w-2/3 '>
            <p className='text-neutral-600'>Bem vindo ao sistema de estoque da AlvesGlass!</p>
            {
              selectedMenu === 'Usuário' &&
              <h1 className='text-4xl font-semibold text-base-blue'>Usuários</h1> ||
              selectedMenu === 'Estoque' &&
              <h1 className='text-4xl font-semibold text-base-blue'>Estoque</h1> ||
              selectedMenu === 'Relatório' &&
              <h1 className='text-4xl font-semibold text-base-blue'>Relatório</h1> ||
              selectedMenu === 'Clients' &&
              <h1 className='text-4xl font-semibold text-base-blue'>Clientes</h1>
            }
          </div>

          <div className='flex justify-center items-center gap-4'>
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
          <Input
            className="py-5 shadow bg-white"
            placeholder="Pesquise..."
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
          />
        </div>

        {
          selectedMenu === 'Usuário' && <UsersPage userName={searchItems} /> ||
          selectedMenu === 'Estoque' && (
            <div>
              {
                categorySectionId === '1' ? <Carpentry categories={categories} id={categorySectionId} /> :
                  <Glassware categories={categories} id={categorySectionId} />
              }
            </div>
          ) ||
          selectedMenu === 'Relatório' && <Report search={searchItems} /> ||
          selectedMenu === 'Clients' && <ClientsPage name={searchItems} />
        }

      </section>
    </main>
  );
};
