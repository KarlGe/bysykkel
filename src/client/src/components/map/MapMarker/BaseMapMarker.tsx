import ReactDOM from "react-dom";
import mapLibreGl, {
  LngLatLike,
  MarkerOptions,
  Map as MapLibre,
  Marker,
} from "maplibre-gl";
import { ReactNode, useContext, useMemo } from "react";
import { MapContext } from "../MapUtils";

type Props = {
  /**
   * Marker options
   */
  markerOptions?: mapLibreGl.MarkerOptions;
  /**
   * The longitude and lattitude of where the marker should be, can either be of type
   * LngLat from the mapLibre library, or a touple [long, lat]
   */
  lngLat: LngLatLike;
  onClick?: (map: MapLibre, marker: Marker) => void;
  children?: ReactNode;
};

function BaseMapMarker({ children, lngLat, markerOptions, onClick }: Props) {
  const { map } = useContext(MapContext);
  const marker = useMemo(() => {
    if (!map) {
      return null;
    }
    const options = {
      ...(markerOptions || {}),
      element: document.createElement("div"),
    } as MarkerOptions;
    const newMarker = new mapLibreGl.Marker(options)
      .setLngLat(lngLat)
      .addTo(map);

    const newMarkerElement = newMarker.getElement();

    const onMarkerClick = () => {
      if (onClick) {
        onClick(map, newMarker);
      }
    };

    if (onClick) {
      newMarkerElement.addEventListener("click", onMarkerClick);
    }
    return newMarker;
  }, [map]);

  if (!marker) {
    return null;
  }

  return ReactDOM.createPortal(children, marker.getElement());
}

export default BaseMapMarker;
