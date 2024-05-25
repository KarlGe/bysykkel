import { useEffect, useState } from "react";
import { getStations } from "@api/station";
import { Station } from "@customTypes/station";
import { RefetchTime } from "@api/config";

export const useStations = () => {
  const [stations, setStations] = useState<Station[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(false);

  const getStationData = () => {
    setLoading(true);
    getStations()
      .then((results) => {
        setStations(results);
        setIsInitialLoad(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!error) {
      getStationData();
      const timeOut = setInterval(getStationData, RefetchTime);
      return () => {
        clearInterval(timeOut);
      };
    }
  }, [error]);

  return { stations, isInitialLoad, loading, error };
};
