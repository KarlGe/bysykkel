using Bysykkel.Application.Models.Bysykkel;

namespace Bysykkel.Tests.Mocks;

static class MockData
{

    public static object BuildStationInformationData()
    {
        var mockInfo = BuildMockStation().Info;
        return new
        {
            last_updated = 1716624810,
            ttl = 15,
            version = 2.3,
            data = new
            {
                stations = new[] {
                    new {
                        station_id=mockInfo.StationId,
                        name=mockInfo.Name,
                        address=mockInfo.Address,
                        lat = mockInfo.Lat,
                        lon = mockInfo.Lng,
                        is_virtual_station = mockInfo.IsVirtualStation,
                        capacity = mockInfo.Capacity,
                    }
                }
            },
        };
    }
    public static object BuildStationStatusData()
    {
        var mockStatus = BuildMockStation().Status;
        return new
        {
            last_updated = 1716624810,
            ttl = 15,
            version = 2.3,
            data = new
            {
                stations = new[] {
                    new {
                        station_id = mockStatus.StationId,
                        is_installed = mockStatus.IsInstalled,
                        is_renting = mockStatus.IsRenting,
                        is_returning = mockStatus.IsReturning,
                        last_reported = mockStatus.LastReported,
                        num_vehicles_available = 0,
                        num_bikes_available = 0,
                        num_docks_available = mockStatus.NumDocksAvailable,
                        vehicle_types_available = new [] {
                            new {
                                vehicle_type_id = mockStatus.VehicleTypesAvailable[0].VehicleTypeId,
                                count = mockStatus.VehicleTypesAvailable[0].Count,
                            }
                        }
                    },
                }
            },
        };
    }
    public static Station BuildMockStation()
    {
        var info = new StationInfo()
        {
            StationId = "0001",
            Name = "Test station",
            Address = "Test address",
            Lat = 10.0001M,
            Lng = 52.0001M,
            IsVirtualStation = true,
            Capacity = 10
        };
        var status = new StationStatus()
        {
            StationId = "0001",
            IsInstalled = true,
            IsRenting = true,
            IsReturning = true,
            LastReported = 1716623480,
            NumDocksAvailable = 5,
            VehicleTypesAvailable = new List<VehicleType>() {
                new VehicleType() { VehicleTypeId = "bike", Count = 5 }
            },
        };
        return new Station(info, status);
    }
}