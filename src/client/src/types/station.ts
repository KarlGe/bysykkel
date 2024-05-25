export type VehicleType = {
  // Currently this is only bike, but could be expanded with more vehicle types in the future
  vehicleTypeId: "bike"; 
  count: number;
};
export type StationInfo = {
  stationId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isVirtualStation: boolean;
  capacity: number;
};
export type StationStatus = {
  stationId: string;
  isInstalled: boolean;
  isRenting: boolean;
  isReturning: boolean;
  lastReported: number;
  numDocksAvailable: number;
  vehicleTypesAvailable: VehicleType[];
};

export type Station = {
  info: StationInfo;
  status: StationStatus;
};
