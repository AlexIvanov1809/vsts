import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { Images } from "../../models/ICoffeeItem";

export interface CoffeeImgItemProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: string;
  images: Images;
}
