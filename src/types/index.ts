export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  status?: string;
  description?: string
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
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export type RelatedProductsProps = {
 relatedProducts: Product[]
}
export type ProductStatus = "в наявності" | "під замовлення";


// export type AdminClientProps = {
//   products: AdminProduct[];
//   categories: string[]
// };
export type PriceCellProps = {
  id: number;
  price: number | null;
};



export type AdminProduct = {
  id: number;
  name: string | null;
  price: number | null;
  status: ProductStatus | null;
  category: string | null;
  images: string[] | null;
};

export type AdminPageProps = {
  products: AdminProduct[];
  categories?: string[]; // уже готовый список категорий
};

export type AdminClientProps = AdminPageProps;

export type ProductsTableProps = AdminPageProps;

export type CategoryCellProps = {
  id: number;
  category: string | null;
  categories?: string[];
};
export type NameCellProps = {
  id: number,
  name:string | null
}
 export type AdminEditClientProps = {
  product: Product;
};
