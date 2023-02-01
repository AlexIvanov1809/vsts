import { ImgItem } from "./ImageItem";

export interface ICoffeeItem {
  _id: string;
  name: string;
  images: Images;
  brand: string;
  sortName: string;
  country: string;
  acidity: number;
  density: number;
  description: string;
  kind: string;
  method: string;
  preparationMethod: string;
  price: Price;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Images {
  quarter?: ImgItem;
  kg?: ImgItem;
  drip?: ImgItem;
}

export interface Price {
  quarter?: string;
  kg?: string;
  drip?: string;
}
