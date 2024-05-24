import { LngLatLike, Map as MapLibre } from "maplibre-gl";
import React from "react";

export type MapContextValue = {
  map: MapLibre;
} | null;
export const MapContext = React.createContext<MapContextValue>(null);

export const OsloCenter = [10.742376, 59.916456] as LngLatLike;

