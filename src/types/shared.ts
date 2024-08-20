export type TLoading = "idle" | "pending" | "successeded" | "Failed";
export type TCategory = {
  id?: number;
  title: string;
  img: string;
  prefix: string;
};

export type TProduct = {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  quantity?: number;
  max: number;
  isLiked?: boolean;
  isAuth?: boolean;
};

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export type Torder = {
  id: number;
  userId: number;
  subTotal: number;
  items: TProduct[];
};
