import { apiClient } from "./api";

export const getFurniturePreviews = async () => {
  const { data } = await apiClient.get("/furniture");
  return data;
};

export const getFurnitureModel = async (id: string | undefined) => {
  if (!id) throw new Error("Invalid id");

  const { data } = await apiClient.get(`/furniture/${id}`);
  return data;
};

export const getFurnitureModels = async (ids: string[]) => {
  return Promise.all(ids.map((id) => getFurnitureModel(id)));
};
