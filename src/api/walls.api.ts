import { apiClient } from "./api";

export const getWallPreviews = async () => {
  const { data } = await apiClient.get("/walls");
  return data;
};

export const getWallTexture = async (id: string | undefined) => {
  if (!id) throw new Error("Invalid id");

  const { data } = await apiClient.get(`/walls/${id}`);
  return data;
};
