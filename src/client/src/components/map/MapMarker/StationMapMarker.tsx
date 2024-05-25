import { Station } from "@customTypes/station";
import BaseMapMarker from "./BaseMapMarker";
import classes from "./stationMapMarker.module.css";
import { MapZoomDistance } from "../MapUtils";

type Props = {
  stationData: Station;
  mapZoomDistance: MapZoomDistance;
};

function StationMapMarker({ stationData, mapZoomDistance }: Props) {
  const { status, info } = stationData;
  const bikesAvailable = status.vehicleTypesAvailable.find(
    (vehicleType) => vehicleType.vehicleTypeId === "bike"
  )?.count;
  return (
    <BaseMapMarker lngLat={[info.lng, info.lat]}>
      <div className={`${classes.stationMarker} ${mapZoomDistance}`}>
        <button onClick={() => console.log("Clicked")} aria-label={info.name}>
          <span className="stationMarker__availability">{bikesAvailable}</span>
        </button>
      </div>
    </BaseMapMarker>
  );
}

export default StationMapMarker;
