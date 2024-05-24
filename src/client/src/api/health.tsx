import { get } from "./util";

export const getHealth = () => {
  return get("/health");
};
