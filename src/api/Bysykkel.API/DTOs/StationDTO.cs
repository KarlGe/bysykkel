namespace Bysykkel.API.DTOs;

public class StationDTO
{
    public required StationInfoDTO Info { get; set; }
    public required StationStatusDTO Status { get; set; }
}
