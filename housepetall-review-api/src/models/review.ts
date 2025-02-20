import { BaseModel } from "./base-model";

export interface Review extends BaseModel{
  id: number;
  name: string;
  petName: string;
  rating: number;
  comments?: string;
}
