using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeManagement.Server.Core.Context;
using ResumeManagement.Server.Core.Dtos.Company;

using ResumeManagement.Server.Core.Entities;

namespace ResumeManagement.Server.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

    private ManagementContext _context { get; }

    private IMapper _mapper;

    public CompanyController(ManagementContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;   
    }

    // CRUD

    // Create
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
    {
        var newCompany = _mapper.Map<Company>(dto);
        await _context.Companies.AddAsync(newCompany);
        await _context.SaveChangesAsync();

        return Ok("Company Created Successfully!");
    }

    // Read
    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
    {
        var companies = await _context.Companies.OrderByDescending(q => q.CreateAt).ToListAsync();
        var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

        return Ok(convertedCompanies);
    }

    [HttpGet]
    [Route("Get/{id}")]
    public async Task<ActionResult<CompanyGetDto>> GetCompanyId(long id)
    {
        var company = await _context.Companies.FirstOrDefaultAsync(i => i.Id == id);
        var convertedCompanies = _mapper.Map<CompanyGetDto>(company);

        return Ok(convertedCompanies);
    }

    // Update
    [HttpPut]
    [Route("Put")]
    public async Task<ActionResult<CompanyPutDto>> PutCompanies([FromBody] CompanyPutDto dto)
    {

        var putCompany = _mapper.Map<Company>(dto);

        if (putCompany == null)
            return BadRequest("Company not found!");
        if(!_context.Companies.Any(x => x.Id == putCompany.Id))
            return NotFound();

         _context.Companies.Update(putCompany);
        await _context.SaveChangesAsync();

        return Ok(putCompany);
    }

    // Delete

}

