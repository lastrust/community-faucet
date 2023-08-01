import { FC } from "react";

export type ValueOf<T> = T[keyof T];

export type CardComponent = FC<{
  title: string;
  grade: number;
  value: string;
  id: string;
  icon: string;
}> & {
  size: { width: number; height: number };
};
