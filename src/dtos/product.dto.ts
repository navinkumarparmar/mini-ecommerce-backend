export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  featured?: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  featured?: boolean;
}
