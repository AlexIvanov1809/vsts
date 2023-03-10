import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ScaleProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: string | number;
  name: string;
}
