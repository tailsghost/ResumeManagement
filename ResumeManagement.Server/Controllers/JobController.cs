using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResumeManagement.Server.Core.Context;
using ResumeManagement.Server.Core.Dtos.Job;

using ResumeManagement.Server.Core.Entities;

namespace ResumeManagement.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobController : ControllerBase
{
    private ManagementContext _context { get; }

    private IMapper _mapper {  get; }

    public JobController(ManagementContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // CRUD

    // Create 
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
    {
        var newJob = _mapper.Map<Job>(dto);
        await _context.Jobs.AddAsync(newJob);
        await _context.SaveChangesAsync();

        return Ok("Job Create Successfully!");
    }
}

