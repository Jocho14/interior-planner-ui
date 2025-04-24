import { apiClient } from "./api";

export const getFloorPreviews = async () => {
  const { data } = await apiClient.get("/floors");
  return data;
};

export const getFloorTexture = async (id: string | undefined) => {
  if (!id) throw new Error("Invalid id");

  const { data } = await apiClient.get(`/floors/${id}`);
  return data;
};
