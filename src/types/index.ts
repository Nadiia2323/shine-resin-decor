export type Product = {
  id: number;
  name: string;
  price: number | null;
  images: string[];
  category: string;
  status?: string | null;
  description?: string;
  options: ProductOption[] | null;
  product_images: ProductImage[] | null;
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
  initialOffset: number | null;
};

export type ProductCardProps = {
  products: Product[];
};

export type CategoryCardProps = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export type ProductPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};
export type RelatedProductRaw = {
  id: number;
  name: string;
  price: number;
  status?: string;
  category?: string;
  product_images?: {
    id?: number;
    url: string;
    position?: number;
    is_main?: boolean;
    public_id?: string;
  }[];
};

export type RelatedProductsProps = {
  relatedProducts: RelatedProductRaw[];
};
export type ProductStatus = "в наявності" | "під замовлення";

export type PriceCellProps = {
  id: number;
  price: number | null;
};

export type ProductOption = {
  name: string;
  price: number | null;
};

export type AdminProduct = {
  id: number;
  name: string | null;
  price: number | null;
  status?: string | null;
  category: string | null;
  description: string | null;
  product_images: ProductImage[];
  options: ProductOption[];
};
export type PreviewFormProps = {
  product: Product;
};

export type AdminPageProps = {
  products: AdminProduct[];
  categories?: string[];
};

export type AdminClientProps = AdminPageProps;

export type ProductsTableProps = AdminPageProps;
export type ProductImage = {
  id: string;
  url: string;
  public_id: string;
  position: number;
  is_main: boolean;
};

export type AdminEditClientProps = {
  productId: number;
  initialImages: ProductImage[];
  categories?: string[];
  product: Product;
};

export type EditFormProps = { product: Product; categories?: string[] };
export type InlineEditFieldProps = {
  id: number | string;
  name: string;
  defaultValue: string;
  action: (formData: FormData) => Promise<void>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  inputClassName?: string;
  formClassName?: string;
  wrapperClassName?: string;

  label?: string;
  meta?: React.ReactNode;
};
export type InlineEditSelectProps = {
  id: number;
  name: string;
  defaultValue?: string;
  options?: string[];
  action: (formData: FormData) => Promise<void>;
  selectClassName?: string;
  placeholder?: string;
};
export type NewImage = { url: string; public_id: string };
