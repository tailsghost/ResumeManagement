﻿using Microsoft.EntityFrameworkCore;
using ResumeManagement.Server.Core.Entities;

namespace ResumeManagement.Server.Core.Context;

public class ManagementContext : DbContext
{
    public ManagementContext(DbContextOptions<ManagementContext> options) : base(options)
    {
    }

    public DbSet<Company> Companies { get; set; }

    public DbSet<Job> Jobs { get; set; }

    public DbSet<Candidate> Candidates { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Job>()
            .HasOne(job => job.Company)
            .WithMany(company => company.Jobs)
            .HasForeignKey(job => job.CompanyId);


        modelBuilder.Entity<Candidate>()
            .HasOne(candidate => candidate.Job)
            .WithMany(job => job.Candidates)
            .HasForeignKey(candidate => candidate.JobId);
    }
}
