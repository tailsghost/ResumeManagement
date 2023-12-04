﻿using AutoMapper;
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
        var companies = await _context.Companies.ToListAsync();
        var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

        return Ok(convertedCompanies);
    }

    // Update

    // Delete

}

