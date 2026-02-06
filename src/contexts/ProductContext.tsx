/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import api from "@/services/api";
import { toast } from "react-toastify";
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  CreatedProductProps,
  CreateStockMovementProps,
  GetCategoryProps,
  GetCategorySectionProps,
  GetProductProps,
  GetStockMovementProps
} from "@/types/ProductsTypes";

interface ProductContextType {
  listProducts: GetProductProps[];
  listCategories: GetCategoryProps[];
  listStockMovements: GetStockMovementProps[];
  listCategoriesSection: GetCategorySectionProps[];
  handleCreateProduct: (data: CreatedProductProps) => Promise<void>;
  handleUpdateProduct: (data: GetProductProps) => Promise<void>;
  handleDeleteProduct: (id: number) => Promise<void>;
  handleCreateCategory: (data: { name: string }) => Promise<void>;
  handleUpdateCategory: (data: GetCategoryProps) => Promise<void>;
  handleDeleteCategory: (id: number) => Promise<void>;
  handleCreateStockMovement: (
    data: CreateStockMovementProps
  ) => Promise<void>;
}


export const ProductContext = createContext({} as ProductContextType);

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [listProducts, setListProducts] = useState<GetProductProps[]>([]);
  const [listCategories, setListCategories] = useState<GetCategoryProps[]>([]);
  const [listCategoriesSection, setListCategoriesSection] = useState<GetCategorySectionProps[]>([]);
  const [listStockMovements, setListStockMovements] = useState<
    GetStockMovementProps[]
  >([]);

  const getListProducts = async () => {
    try {
      const response = await api.get("items");
      setListProducts(response.data);
    } catch (error) {
      console.log("Erro ao carregar produtos", error);
    }
  };

  const getListCategoriesSection = async () => {
    try {
      const response = await api.get("categories-section");
      setListCategoriesSection(response.data);
    } catch (error) {
      console.log("Erro ao carregar categorias", error);
    }
  };

  const getListCategories = async () => {
    try {
      const response = await api.get("categories");
      setListCategories(response.data);
    } catch (error) {
      console.log("Erro ao carregar categorias", error);
    }
  };

  const getStockMovements = async () => {
    try {
      const response = await api.get("stock-movements");
      setListStockMovements(response.data);
    } catch (error) {
      console.log("Erro ao carregar movimentações", error);
    }
  };


  useEffect(() => {
    getListProducts();
    getListCategories();
    getStockMovements()
    getListCategoriesSection()

    const saved = localStorage.getItem("ProdutosAlomoxarifado");
    if (saved) setListProducts(JSON.parse(saved));
  }, []);

  const handleCreateProduct = async (data: CreatedProductProps) => {
    try {
      await toast.promise(api.post("items", data), {
        pending: "Criando produto...",
        success: "Produto criado com sucesso!",
        error: "Erro ao criar produto.",
      });
      getListProducts();
    } catch (error) {
      console.log("Erro ao criar produto", error);
    }
  }

  const handleUpdateProduct = async (data: GetProductProps) => {
    try {
      await toast.promise(api.put(`items/${data.id}`, data), {
        pending: "Atualizando produto...",
        success: "Produto atualizado com sucesso!",
        error: "Erro ao atualizar produto.",
      });
      getListProducts();
    } catch (error) {
      console.log("Erro ao atualizar produto", error);
    }
  }

  const handleCreateCategory = async (data: { name: string }) => {
    try {
      await toast.promise(api.post("categories", data), {
        pending: "Criando categoria...",
        success: "Categoria criada com sucesso!",
        error: "Erro ao criar categoria.",
      });
      getListCategories();
    } catch (error) {
      console.log("Erro ao criar categoria", error);
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await toast.promise(api.delete(`items/${id}`), {
        pending: "Excluindo produto...",
        success: "Produto excluído com sucesso!",
        error: "Erro ao excluir produto.",
      });
      getListProducts();
    } catch (error) {
      console.log("Erro ao excluir produto", error);
    }
  }

  const handleUpdateCategory = async (data: GetCategoryProps) => {
    try {
      await toast.promise(api.put(`categories/${data.id}`, data), {
        pending: "Atualizando categoria...",
        success: "Categoria atualizada com sucesso!",
        error: "Erro ao atualizar categoria.",
      });
      getListCategories();
    } catch (error) {
      console.log("Erro ao atualizar categoria", error);
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      await toast.promise(api.delete(`categories/${id}`), {
        pending: "Excluindo categoria...",
        success: "Categoria excluída com sucesso!",
        error: "Erro ao excluir categoria.",
      });
      getListCategories();
    } catch (error) {
      console.log("Erro ao excluir categoria", error);
    }
  }

  const handleCreateStockMovement = async (
    data: CreateStockMovementProps
  ) => {
    try {
      await toast.promise(api.post("stock-movements", data), {
        pending: "Registrando movimentação...",
        success: "Movimentação registrada com sucesso!",
        error: "Erro ao registrar movimentação.",
      });

      getStockMovements();
      getListProducts(); // 🔄 atualiza estoque automaticamente
    } catch (error) {
      console.log("Erro ao criar movimentação", error);
    }
  };


  return (
    <ProductContext.Provider
      value={{
        listProducts,
        listCategories,
        listStockMovements,
        listCategoriesSection,
        handleCreateProduct,
        handleUpdateProduct,
        handleCreateCategory,
        handleDeleteProduct,
        handleUpdateCategory,
        handleDeleteCategory,
        handleCreateStockMovement
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
