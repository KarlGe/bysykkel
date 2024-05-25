import { useStations } from "src/hooks/useStations";
import StationMapMarker from "./StationMapMarker";
import { MapContext, MapZoomDistance } from "../MapUtils";
import { useContext, useEffect, useState } from "react";
import { Station } from "@customTypes/station";
import StationsError from "./StationsError";
import LoadingIndicator from "@components/atoms/LoadingIndicator/LoadingIndicator";

function MarkerContainer() {
  const { stations, error, isInitialLoad, loading } = useStations();
  const { map, setActiveStation } = useContext(MapContext);
  const [mapZoomDistance, setMapZoomDistance] = useState<
    MapZoomDistance | undefined
  >("zoom-distant");

  useEffect(() => {
    if (!map) {
      return;
    }

    const onMapZoom = () => {
      const mapZoom = map.getZoom();
      if (mapZoom >= 14) {
        setMapZoomDistance("zoom-close");
      } else if (mapZoom <= 14) {
        setMapZoomDistance("zoom-distant");
      }
    };
    onMapZoom();
    map.on("zoom", onMapZoom);

    return () => {
      map?.off("zoom", onMapZoom);
    };
  }, [map]);

  if (!mapZoomDistance) {
    return null;
  }

  const onMarkerClick = (stationData: Station) => {
    if (setActiveStation) {
      setActiveStation(stationData);
    }
  };
  return (
    <>
      <LoadingIndicator isLoading={loading} />
      {stations?.map((stationData) => (
        <StationMapMarker
          mapZoomDistance={mapZoomDistance}
          stationData={stationData}
          key={stationData.info.stationId}
          onClick={onMarkerClick}
        />
      ))}
      <StationsError hasError={error} isInitialLoad={isInitialLoad} />
    </>
  );
}

export default MarkerContainer;
