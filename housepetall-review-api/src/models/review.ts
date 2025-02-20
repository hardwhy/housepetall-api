import { BaseModel } from "./base-model";

export interface Review extends BaseModel{
  id: string;
  name: string;
  petName: string;
  rating: number;
  comments?: string;
}
