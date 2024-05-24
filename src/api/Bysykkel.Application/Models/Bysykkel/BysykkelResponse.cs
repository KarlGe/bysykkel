using Newtonsoft.Json;

namespace Bysykkel.Application.Models.Bysykkel;

public class BysykkelResponse<T>
{
    [JsonProperty("last_updated")]
    public int LastUpdated;
    [JsonProperty("ttl")]
    public int Ttl;
    [JsonProperty("version")]
    public required string Version;
    [JsonProperty("data")]
    public required T Data;
}
