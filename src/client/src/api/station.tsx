import { Station } from "@customTypes/station";
import { get } from "./util";

export const getStations = (): Promise<Station[]> => {
  return get("/stations").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<Station[]>;
  });
};
