export interface OrderProductDTO {
  product: string; 
  quantity: number;
}

export interface PlaceOrderDTO {
  products: OrderProductDTO[];
}
