import { ImgItem } from "./ImageItem";

export interface ITeaItem {
  _id: string;
  name: string;
  images: { tea: ImgItem };
  brand: string;
  package: string;
  description: string;
  type: string;
  weight: string;
  recipe: string;
  price: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}