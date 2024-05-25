import { useContext } from "react";
import { MapContext } from "../MapUtils";
import classes from "./mapOverlay.module.css";
import { GetAvailableVehiclesOfType } from "src/helpers/stationHelpers";

export default function MapOverlay() {
  const { activeStation } = useContext(MapContext);
  const bikesAvailable = GetAvailableVehiclesOfType(activeStation, "bike");
  return (
    <div className={classes.mapOverlay}>
      <h1>{activeStation?.info.name}</h1>
      <ul>
        <li>Ledige sykler: {bikesAvailable}</li>
        <li>Ledige låser: {activeStation?.status.numDocksAvailable}</li>
      </ul>
    </div>
  );
}
