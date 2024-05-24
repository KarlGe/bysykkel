import { APIBaseUrl } from "./config";

export const get = (path: string) => {
  return fetch(`${APIBaseUrl}${path}`);
};
