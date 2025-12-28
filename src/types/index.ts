export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  status?: string
};


export type Category = {
  name: string;
};

export type User = {
  id: string;
  email: string;
};
 
export type PageClientProps = {
  categories: string[];
  products: Product[];
};

export type ProductCardProps = {
  products: Product[];
};

export type CategoryCardProps = {
  categories: string[];
  onSelect: (category: string) => void;
};

export type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export type RelatedProductsProps = {
 relatedProducts: Product[]
}
export type ProductStatus = "в наявності" | "під замовлення";
export type AdminProduct = {
  id: number;
  name: string | null;
  price: number | null;
  status: ProductStatus;
  category: string | null;
  images:string[] | null
};

export type AdminClientProps = {
  products: AdminProduct[];
};