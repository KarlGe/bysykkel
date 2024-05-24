import { useEffect, useRef, useState } from "react";
import { Map as MapLibre } from "maplibre-gl";
import { MapStyleUrl } from "@config";
import { MapContext, MapContextValue, OsloCenter } from "./MapUtils";
import classes from "./map.module.css";

function Map() {
  const [mapContextRef, setMapContextRef] = useState<MapContextValue>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

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
      <div
        className={classes.mapContainer}
        key="map"
        ref={mapContainer}
      ></div>
    </MapContext.Provider>
  );
}

export default Map;
