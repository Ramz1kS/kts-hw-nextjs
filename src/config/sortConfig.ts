import { Option } from "@/shared/types";

export const sortHow: Option[] = [
  { key: "desc", name: "High to low" },
  { key: "asc", name: "Low to high" },
];

export const sortBy: Option[] = [
  { key: "none", name: "Don't" },
  { key: "price", name: "Price" },
  { key: "rating", name: "Rating" },
];