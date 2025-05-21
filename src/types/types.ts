import { IconType } from "react-icons";

type BaseContent = {
  title: string;
  image: string;
};

export type Favorite = BaseContent & {
  id: number;
  price: number;
};

export type Product = Favorite & {
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
};

export type Brand = BaseContent & {
  description: string;
  link: string;
  isFeatured?: boolean;
};

export type Category = BaseContent & {
  icon: IconType;
  description: string;
  link: string;
};

export type Item = BaseContent & {
  itemId: number;
  quantity: number;
  price: number;
};

export type CartItem = Item & {
  userId: string | null;
};

export type ErrorProps = {
  message: string;
};

export type GuestWarningModalProps = {
  open: boolean;
  onClose: () => void;
  onContinueAsGuest: () => void;
  onSignIn: () => void;
};

export type LoginParams = {
  email: string;
  password: string;
};

type BaseUser = {
  firstName: string;
  avatarUrl?: string;
};

export type SignUpParams = LoginParams &
  BaseUser & {
    lastName: string;
  };

export type UserData = BaseUser & {
  id: string;
};

export type UserProfile = UserData & {
  email: string;
};

export type CategoryCardProps = {
  category: Category;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
};

export type CategoryInfoCardProps = Omit<Category, "icon">;

export type ProductCardProps = {
  product: Product;
};

export type ProductDetailModalProps = ProductCardProps & {
  onClose: () => void;
};

export type CartState = {
  items: CartItem[];
  totalQuantity: number;
};

export type FavoritesState = {
  items: Favorite[];
  totalQuantity: number;
};

export type UserState = {
  profile: UserProfile | null;
};

export type RootState = {
  cart: CartState;
  favorites: FavoritesState;
  user: UserState;
};
