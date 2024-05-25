namespace Bysykkel.API.DTOs;

public class StationStatusDTO
{
    public required string StationId { get; set; }
    public bool IsInstalled { get; set; }
    public bool IsRenting { get; set; }
    public bool IsReturning { get; set; }
    public int LastReported { get; set; }
    public int NumDocksAvailable { get; set; }
    public required List<VehicleTypeDTO> VehicleTypesAvailable { get; set; }
}
