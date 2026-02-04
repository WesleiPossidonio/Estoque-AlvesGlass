import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Box, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProduct';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import api from '@/services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const exitSchema = z.object({
  quantity: z.coerce.number().min(1, 'Quantidade mínima é 1'),
  withdrawn_by: z.string().min(2, 'Informe quem está retirando'),
});

interface Item {
  id: string;
  item_name: string;
  quantity: number;
  unit: string;
}

const ITEMS_PER_PAGE = 3;

export const ExitPage = () => {
  const { handleCreateStockMovement } = useProduct();

  const [scanning, setScanning] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [page, setPage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(exitSchema),
    defaultValues: {
      quantity: 1,
      withdrawn_by: '',
    },
  });

  const { listProducts, listCategories } = useProduct();

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = listProducts.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(listProducts.length / ITEMS_PER_PAGE);

  // ================= QR CODE =================
  useEffect(() => {
    if (!scanning) return;

    const html5QrCode = new Html5Qrcode('reader');

    html5QrCode
      .start(
        { facingMode: 'environment' }, // câmera traseira
        {
          fps: 10,
          qrbox: 250,
        },
        async (decodedText) => {
          await html5QrCode.stop();
          html5QrCode.clear();
          setScanning(false);

          try {
            const response = await api.get(`/items/code/${decodedText}`);
            setItem(response.data);
          } catch {
            alert('Item não encontrado');
          }
        },
        (error) => {
          console.error('QR Code error:', error);
        }
      )
      .catch(() => {
        alert('Não foi possível acessar a câmera');
        setScanning(false);
      });

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [scanning]);

  // ================= SUBMIT =================
  const onSubmit = async (data: z.infer<typeof exitSchema>) => {
    if (!item) return;

    if (data.quantity > item.quantity) {
      alert('Quantidade maior que o estoque disponível');
      return;
    }

    await handleCreateStockMovement({
      item_id: item.id,
      movement_type: 'OUT',
      quantity: data.quantity,
      withdrawn_by: data.withdrawn_by,
    });

    reset();
    setItem(null);
  };

  // ================= SCANNER =================
  if (scanning) {
    return (
      <section className="w-full h-svh flex flex-col items-center justify-center gap-4">
        <div
          id="reader"
          className="w-72"
        />
        <Button
          variant="outline"
          onClick={() => setScanning(false)}
        >
          Cancelar
        </Button>
      </section>
    );
  }

  // ================= FORM =================
  if (item) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-svh flex flex-col justify-center gap-4 p-6"
      >
        <h2 className="text-xl font-semibold">{item.item_name}</h2>

        <p className="text-sm text-muted-foreground">
          Estoque disponível: {item.quantity} {item.unit}
        </p>

        <input
          type="number"
          min={1}
          max={item.quantity}
          {...register('quantity')}
          className="border p-3 rounded"
          placeholder="Quantidade"
        />
        {errors.quantity && (
          <p className="text-xs text-red-500">{errors.quantity.message}</p>
        )}

        <input
          {...register('withdrawn_by')}
          className="border p-3 rounded"
          placeholder="Quem está retirando"
        />
        {errors.withdrawn_by && (
          <p className="text-xs text-red-500">{errors.withdrawn_by.message}</p>
        )}

        <Button
          type="submit"
          className="bg-neutral-700"
        >
          Confirmar Saída
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setItem(null)}
        >
          Voltar
        </Button>
      </form>
    );
  }

  // ================= HOME =================
  return (
    <section className="w-full h-svh flex flex-col items-center justify-center">
      <h1 className="self-start text-lg md:text-4xl font-semibold mx-5">
        Saída de Produtos
      </h1>
      <div className="w-full grid grid-cols-4 gap-4 p-6">
        <div className="col-span-4 md:col-span-3 flex items-center justify-center gap-3 ">
          <Input
            className="bg-neutral-50 py-6 "
            placeholder="Digite o nome do Produto"
          />
          <Button className="py-6 w-12 bg-blue-800">
            <Search className="size-6 font-semibold" />
          </Button>
        </div>

        <Button
          className="col-span-4 md:col-span-1 p-6 text-lg font-semibold bg-neutral-500"
          onClick={() => setScanning(true)}
        >
          Buscar Item QR Code
        </Button>
      </div>

      <div className="w-full p-6 spacey-3">
        {/* 🔄 Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {listCategories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/2"
              >
                <div className="h-20 bg-neutral-50 rounded-md shadow flex items-center justify-center">
                  {category.name}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
                  <p className="font-semibold text-sm">{item.item_name}</p>
                  <span className="text-xs text-neutral-400">{item.unit}</span>
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
  );
};
