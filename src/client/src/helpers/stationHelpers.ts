import { Station, VehicleType } from "@customTypes/station";

export const GetAvailableVehiclesOfType = (
  stationData: Station | undefined,
  wantedType: VehicleType["vehicleTypeId"]
) => {
  if (!stationData) {
    return undefined;
  }
  return stationData.status.vehicleTypesAvailable.find(
    (vehicleType) => vehicleType.vehicleTypeId === wantedType
  )?.count;
};
