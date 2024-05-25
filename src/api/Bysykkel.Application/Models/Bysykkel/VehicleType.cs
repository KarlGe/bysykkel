using Newtonsoft.Json;

namespace Bysykkel.Application.Models.Bysykkel;

public class VehicleType
{
    [JsonProperty("vehicle_type_id")]
    public required string VehicleTypeId { get; set; }
    [JsonProperty("count")]
    public int Count { get; set; }
}