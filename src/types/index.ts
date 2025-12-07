export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
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
  params: {
    id: string;
  };
};
export type RelatedProductsProps = {
 relatedProducts: Product[]
}