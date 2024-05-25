import { Station } from "@customTypes/station";
import { LngLatLike, Map as MapLibre } from "maplibre-gl";
import React from "react";

export type MapContextValue = {
  map: MapLibre | null;
  activeStation?: Station;
  setActiveStation?: (stationData: Station) => void;
};

export type MapZoomDistance = "zoom-close" | "zoom-distant";

export const MapContext = React.createContext<MapContextValue>({ map: null });

export const OsloCenter = [10.742376, 59.916456] as LngLatLike;
