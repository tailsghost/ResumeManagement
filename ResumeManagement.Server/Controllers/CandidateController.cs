﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeManagement.Server.Core.Context;
using ResumeManagement.Server.Core.Dtos.Candidate;
using ResumeManagement.Server.Core.Entities;

namespace ResumeManagement.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CandidateController : ControllerBase
{
    private ManagementContext _context;
    private IMapper _mapper;

    public CandidateController(ManagementContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper; 
    }


    // CRUD 

    // Create
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
    {
        var fiveMegaByte = 5 * 1024 * 1024;
        var pdfMimeType = "application/pdf";

        if (pdfFile != null && pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            return BadRequest("File is not valid!");

        var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await pdfFile.CopyToAsync(stream);

        var newCandidate = _mapper.Map<Candidate>(dto);
        newCandidate.ResumeUrl = resumeUrl;
        await _context.Candidates.AddAsync(newCandidate);
        await _context.SaveChangesAsync();

        return Ok("Candidate Saved Successfully!");
    }

    // Read 
    [HttpGet]
    [Route("Get")]
    public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidate()
    {
        var candidates = await _context.Candidates.Include(x => x.Job).ToListAsync();
        var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);

        return Ok(convertedCandidates);
    }

    // Read (Download PdfFile)
    [HttpGet]
    [Route("dowload/{url}")]
    public IActionResult DowloadPdfFile(string url)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

        if(!System.IO.File.Exists(filePath))
            return NotFound("File Not Found");

        var pdfBytes = System.IO.File.ReadAllBytes(filePath);
        var file = File(pdfBytes, "application/pdf", url);
        return file;
        
    }

    // Update

    // Delete

}

