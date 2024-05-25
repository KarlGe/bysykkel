using Newtonsoft.Json;

namespace Bysykkel.Application.Models.Bysykkel;

public class StationInfoResponseData
{
    [JsonProperty("stations")]
    public required IList<StationInfo> Stations;
}
public class StationInfo
{
    [JsonProperty("station_id")]
    public required string StationId { get; set; }
    [JsonProperty("name")]
    public required string Name { get; set; }
    [JsonProperty("address")]
    public required string Address { get; set; }
    [JsonProperty("lat")]
    public decimal Lat { get; set; }
    [JsonProperty("lon")]
    public decimal Lng { get; set; }
    [JsonProperty("is_virtual_station")]
    public bool IsVirtualStation { get; set; }
    [JsonProperty("capacity")]
    public int Capacity { get; set; }
}
