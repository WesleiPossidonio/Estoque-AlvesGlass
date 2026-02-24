import { useProduct } from '@/hooks/useProduct';
import { format } from 'date-fns';
import { Boxes } from 'lucide-react';

interface IndoReport {
  reportID: string;
}

export const InfoReport = ({ reportID }: IndoReport) => {
  const { listStockMovements, listCategoriesSection } = useProduct();

  const report = listStockMovements.find((item) => item.id === reportID);
  const date =
    report?.createdAt !== undefined &&
    format(new Date(report.createdAt), 'dd/MM/yyyy - HH:mm');

  const sectorList = listCategoriesSection.find(sector => sector.id ===
    report?.item?.category.category_section_id)

  return (
    <section className="px-4">
      <div className="flex items-center justify-between">
        <div className='flex items-center justify-center gap-2'>
          <Boxes className='size-15 text-neutral-700' />
          <div>
            <h3 className="text-sm text-neutral-500">Histórico do estoque</h3>
            <h1 className="text-2xl font-semibold">
              {report?.item_name_snapshot}
            </h1>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm text-neutral-500">
            Data da {report?.movement_type === 'IN' ? 'entrada' : 'saída'}
          </h3>
          <h2 className="text-neutral-500 font-semibold">{date}</h2>
        </div>
      </div>

      <p className="text-sm text-neutral-500 mt-1">
        Efetuado por{' '}
        {report?.withdrawn_by ? report?.withdrawn_by : report?.added_by}
      </p>

      <div className='mt-5'>
        <h2 className='text-xl font-semibold'>Informações</h2>

        <div className='grid grid-cols-2 gap-1 mt-4'>
          <p className='md:col-span-1 text-neutral-600'>
            <span className='font-semibold text-neutral-600'>Setor:</span>{' '}
            {sectorList?.name}
          </p>
          <p className='md:col-span-1 text-neutral-600'>
            <span className='font-semibold text-neutral-600'> Ação efetuada: </span>
            {report?.movement_type === 'IN' ?
              'Entrada de produtos' : 'Saída de Produtos'}
          </p>
          <p className='col-span-2 text-neutral-600'>
            <span className='font-semibold text-neutral-600'> Quantidade de Itens: </span>
            {report?.quantity} items
          </p>
        </div>
      </div>
    </section>
  );
};
