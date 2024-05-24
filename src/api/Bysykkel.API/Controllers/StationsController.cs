using Microsoft.AspNetCore.Mvc;
using Bysykkel.API.DTOs;
using Bysykkel.Application.Services;
using AutoMapper;

namespace Bysykkel.API.Controllers;

[ApiController]
[Route("stations")]
public class StationsController : ControllerBase
{
    private readonly ILogger<StationsController> _logger;
    private readonly IBysykkelService _bysykkelService;
    private readonly IMapper _mapper;

    public StationsController(ILogger<StationsController> logger, IBysykkelService bysykkelService, IMapper mapper)
    {
        _logger = logger;
        _bysykkelService = bysykkelService;
        _mapper = mapper;
    }

    [HttpGet(Name = "")]
    public async Task<IEnumerable<StationDTO>> Get()
    {
        var stationResponse = await _bysykkelService.GetStationsAsync();

        return _mapper.Map<List<StationDTO>>(stationResponse);
    }
}
