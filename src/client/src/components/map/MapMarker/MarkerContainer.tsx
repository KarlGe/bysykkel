import { useStations } from "src/hooks/useStations";
import StationMapMarker from "./StationMapMarker";
import { MapContext, MapZoomDistance } from "../MapUtils";
import { useContext, useEffect, useState } from "react";
import { Station } from "@customTypes/station";

function MarkerContainer() {
  const { stations } = useStations();
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
      {stations?.map((stationData) => (
        <StationMapMarker
          mapZoomDistance={mapZoomDistance}
          stationData={stationData}
          key={stationData.info.stationId}
          onClick={onMarkerClick}
        />
      ))}
    </>
  );
}

export default MarkerContainer;
