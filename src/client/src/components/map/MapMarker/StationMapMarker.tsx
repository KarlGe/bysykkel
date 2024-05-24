import { Station } from "@customTypes/station";
import BaseMapMarker from "./BaseMapMarker";
import classes from "./stationMapMarker.module.css";

type Props = {
  stationData: Station;
};

function StationMapMarker({ stationData }: Props) {
  return (
    <BaseMapMarker
      lngLat={[stationData.lng, stationData.lat]}
      className={classes.stationMarker}
    >
      <button
        onClick={() => console.log("Clicked")}
        aria-label={stationData.name}
      >
        {stationData.capacity}
      </button>
    </BaseMapMarker>
  );
}

export default StationMapMarker;
