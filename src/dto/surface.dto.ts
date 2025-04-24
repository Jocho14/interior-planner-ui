export interface SurfacePreviewDto {
  id: string;
  imageUrl: string;
}

export interface TextureDto {
  color: string;
  displacement: string;
  normal: string;
  roughness: string;
  ambientOcclusion?: string;
}
