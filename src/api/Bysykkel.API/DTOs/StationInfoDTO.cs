namespace Bysykkel.API.DTOs;

public class StationInfoDTO
{
    public required string StationId { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public decimal Lat { get; set; }
    public decimal Lng { get; set; }
    public bool IsVirtualStation { get; set; }
    public int Capacity { get; set; }
}
