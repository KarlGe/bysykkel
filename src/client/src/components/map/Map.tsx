import { useEffect, useRef, useState } from "react";
import { Map as MapLibre } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapStyleUrl } from "@config";
import { MapContext, MapContextValue, OsloCenter } from "./MapUtils";
import classes from "./map.module.css";
import BaseMapMarker from "./MapMarker/BaseMapMarker";
import { useStations } from "src/hooks/useStations";
import StationMapMarker from "./MapMarker/StationMapMarker";

function Map() {
  const [mapContextRef, setMapContextRef] = useState<MapContextValue>({
    map: null,
  });
  const mapContainer = useRef<HTMLDivElement>(null);
  const { stations } = useStations();

  useEffect(() => {
    const map = new MapLibre({
      container: mapContainer.current as HTMLDivElement,
      style: MapStyleUrl,
      center: OsloCenter,
      zoom: 12,
    });

    setMapContextRef({
      map,
    });
    return () => {
      map.remove();
    };
  }, []);
  return (
    <MapContext.Provider value={mapContextRef}>
      <div className={classes.mapContainer} key="map" ref={mapContainer}></div>
      {stations?.map((stationData) => (
        <StationMapMarker
          stationData={stationData}
          key={stationData.stationId}
        />
      ))}
    </MapContext.Provider>
  );
}

export default Map;
