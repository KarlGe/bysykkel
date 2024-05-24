import ReactDOM from "react-dom";
import mapLibreGl, {
  LngLatLike,
  MarkerOptions,
  Map as MapLibre,
  Marker,
} from "maplibre-gl";
import { ReactNode, useContext, useEffect, useState } from "react";
import { MapContext } from "../MapUtils";

type Props = {
  className?: string;
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

function BaseMapMarker({
  children,
  className,
  lngLat,
  markerOptions,
  onClick,
}: Props) {
  const { map } = useContext(MapContext);
  const [marker, setMarker] = useState<mapLibreGl.Marker | null>(null);
  useEffect(() => {
    if (!map) {
      return;
    }
    const options = {
      ...(markerOptions || {}),
      element: document.createElement("div"),
    } as MarkerOptions;
    const newMarker = new mapLibreGl.Marker(options)
      .setLngLat(lngLat)
      .addTo(map);

    const newMarkerElement = newMarker.getElement();
    if (className) {
      newMarkerElement.classList.add(className);
    }

    const onMarkerClick = () => {
      if (onClick) {
        onClick(map, newMarker);
      }
    };

    if (onClick) {
      newMarkerElement.addEventListener("click", onMarkerClick);
    }

    setMarker(newMarker);

    return () => {
      if (onClick) {
        newMarkerElement.removeEventListener("click", onMarkerClick);
      }
      newMarker.remove();
    };
  }, [map, className, lngLat, markerOptions, onClick]);

  if (!marker) {
    return null;
  }

  return ReactDOM.createPortal(children, marker.getElement());
}

export default BaseMapMarker;
