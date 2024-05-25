import { useEffect, useRef, useState } from "react";
import { Map as MapLibre } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapStyleUrl } from "@config";
import { MapContext, OsloCenter } from "./MapUtils";
import classes from "./map.module.css";
import MarkerContainer from "./MapMarker/MarkerContainer";
import { Station } from "@customTypes/station";
import MapOverlay from "./MapOverlay/MapOverlay";

function Map() {
  const [mapRef, setMapRef] = useState<MapLibre | null>(null);
  const [activeStation, setActiveStation] = useState<Station | undefined>();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new MapLibre({
      container: mapContainer.current as HTMLDivElement,
      style: MapStyleUrl,
      center: OsloCenter,
      zoom: 12,
    });

    setMapRef(map);
    return () => {
      map.remove();
    };
  }, []);

  return (
    <MapContext.Provider
      value={{ map: mapRef, activeStation, setActiveStation }}
    >
      <div
        className={`${classes.mapContainer}`}
        key="map"
        ref={mapContainer}
      ></div>
      <MarkerContainer />
      <MapOverlay />
    </MapContext.Provider>
  );
}

export default Map;
