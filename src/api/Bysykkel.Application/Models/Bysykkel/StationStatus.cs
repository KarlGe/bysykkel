using Newtonsoft.Json;

namespace Bysykkel.Application.Models.Bysykkel;

public class StationStatusResponseData
{
    [JsonProperty("stations")]
    public required IList<StationStatus> Stations;
}
public class StationStatus
{
    [JsonProperty("station_id")]
    public required string StationId { get; set; }
    [JsonProperty("is_installed")]
    public bool IsInstalled { get; set; }
    [JsonProperty("is_renting")]
    public bool IsRenting { get; set; }
    [JsonProperty("is_returning")]
    public bool IsReturning { get; set; }

    [JsonProperty("last_reported")]
    public int LastReported { get; set; }
    [JsonProperty("num_docks_available")]
    public int NumDocksAvailable { get; set; }
    [JsonProperty("vehicle_types_available")]
    public required List<VehicleType> VehicleTypesAvailable { get; set; }
}
