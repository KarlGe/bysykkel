import { Station } from "@customTypes/station";
import BaseMapMarker from "./BaseMapMarker";
import classes from "./stationMapMarker.module.css";
import { MapZoomDistance } from "../MapUtils";
import { GetAvailableVehiclesOfType } from "src/helpers/stationHelpers";

type Props = {
  stationData: Station;
  mapZoomDistance: MapZoomDistance;
  onClick?: (stationData: Station) => void;
};

function StationMapMarker({ stationData, mapZoomDistance, onClick }: Props) {
  const { info } = stationData;
  const bikesAvailable = GetAvailableVehiclesOfType(stationData, "bike");

  const onMarkerClick = () => {
    if (onClick) {
      onClick(stationData);
    }
  };

  return (
    <BaseMapMarker lngLat={[info.lng, info.lat]}>
      <div className={`${classes.stationMarker} ${mapZoomDistance}`}>
        <button onClick={onMarkerClick} aria-label={info.name}>
          <span className="stationMarker__availability">{bikesAvailable}</span>
        </button>
      </div>
    </BaseMapMarker>
  );
}

export default StationMapMarker;
