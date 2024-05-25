using Microsoft.AspNetCore.Mvc;
using Bysykkel.API.DTOs;
using Bysykkel.Application.Services;
using AutoMapper;
using Microsoft.Extensions.Caching.Memory;

namespace Bysykkel.API.Controllers;

[ApiController]
[Route("stations")]
public class StationsController : ControllerBase
{
    private readonly ILogger<StationsController> _logger;
    private readonly IBysykkelService _bysykkelService;
    private readonly IMapper _mapper;
    private readonly IMemoryCache _memoryCache;

    public StationsController(ILogger<StationsController> logger, IBysykkelService bysykkelService, IMapper mapper, IMemoryCache memoryCache)
    {
        _logger = logger;
        _bysykkelService = bysykkelService;
        _mapper = mapper;
        _memoryCache = memoryCache;
    }

    [HttpGet(Name = "")]
    public async Task<IEnumerable<StationDTO>> Get()
    {
        var stationResponse = await _bysykkelService.GetStationsAsync();
        var mapped = _mapper.Map<List<StationDTO>>(stationResponse);
        return mapped;
    }
}
