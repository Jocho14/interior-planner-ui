export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// Returns the first value from the id string being the db id of that model
export const extractModelId = (id: string): string => {
  return id.split("-")[0];
};

export const snakeToNormalCase = (s: string) => s.replace(/_/g, " ");
