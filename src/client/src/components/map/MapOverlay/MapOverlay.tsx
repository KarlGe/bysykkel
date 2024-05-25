import { useContext, useEffect, useState } from "react";
import { MapContext } from "../MapUtils";
import { GetAvailableVehiclesOfType } from "src/helpers/stationHelpers";
import BaseMapOverlay from "./BaseMapOverlay";

export default function MapOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeStation, setActiveStation } = useContext(MapContext);
  const bikesAvailable = GetAvailableVehiclesOfType(activeStation, "bike");
  useEffect(() => {
    if (activeStation) {
      setIsOpen(true);
    }
  }, [activeStation, activeStation?.info.stationId]);

  const onClose = () => {
    setIsOpen(false);
    if (setActiveStation) {
      setActiveStation(undefined);
    }
  };
  if (!isOpen) {
    return null;
  }
  return (
    <BaseMapOverlay key={activeStation?.info.stationId || ""} title={activeStation?.info.name || ""} onClose={onClose}>
      <ul>
        <li>Ledige sykler: {bikesAvailable}</li>
        <li>Ledige låser: {activeStation?.status.numDocksAvailable}</li>
      </ul>
    </BaseMapOverlay>
  );
}
