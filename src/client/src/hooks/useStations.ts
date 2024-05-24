import { useEffect, useState } from "react";
import { getStations } from "@api/station";
import { Station } from "@customTypes/station";

export const useStations = () => {
  const [stations, setStations] = useState<Station[] | undefined>(undefined);
  useEffect(() => {
    getStations().then((results) => {
      setStations(results);
    });
  }, []);

  return { stations };
};
