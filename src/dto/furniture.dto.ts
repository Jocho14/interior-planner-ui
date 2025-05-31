import { UUID } from "@/types/uuid";

export interface FurniturePreviewDto {
  id: UUID;
  name: string;
  thumbnailUrl: string;
}

//TODO: change snake_case on backend to camelCase
export interface FurnitureDto {
  id: UUID;
  name: string;
  model_url: string;
  thumbnail_url: string;
}
