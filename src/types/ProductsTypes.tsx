export interface GetProductProps {
  id: string;
  item_name: string;
  category_id: string;
  unit: string;
  code: string;
  quantity: number;
  min_quantity: number;
  locationv: string;
  control_level: string,
  sector_name: string;
}

export interface CreatedProductProps {
  item_name: string;
  category_id: string;
  unit: string;
  code: string;
  quantity: number;
  min_quantity: number;
  locationv: string;
  control_level: string
  sector_name: string;
}

export interface GetCategoryProps {
  id: string;
  name: string;
}

export interface CreateStockMovementProps {
  item_id: string;
  movement_type: "IN" | "OUT";
  quantity: number;
  client_id?: string | null;
  withdrawn_by?: string | null;
  note?: string | null;
}

export interface GetStockMovementProps {
  id: number;
  item_id: string;
  item_name_snapshot: string;
  movement_type: "IN" | "OUT";
  quantity: number;
  authorized_by: string | null;
  withdrawn_by: string | null;
  note: string | null;
  created_at: string;
  item?: {
    id: string;
    item_name: string;
  };
}

export interface addProductToCartProps extends GetProductProps {
  quantity: number;
  subTotal: number;
  discountedTotal: number; // sempre existe
  cupons?: string;
}