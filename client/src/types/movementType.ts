export type MovementType = {
  id?: number;
  productId: number;
  name?: string;
  type: "ENTRADA" | "SAIDA";
  reason?: string;
  quantity: number;
  date?: string;
};
