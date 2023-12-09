using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using ViewModels;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ViewModel.ViewModel;

public class ResumeManagementViewModel : ViewModelBase
{
    public ObservableCollection<CompanyName> CompaniesNames { get; set; } = new();

    private readonly ClientsHelper clientsModel = new ClientsHelper();

    public RelayCommand Refresh => GetCommand(async () =>
    {
        CompaniesNames.Clear();
        
        foreach(CompanyName name in await clientsModel.GetCompanyNames())
        {
            CompaniesNames.Add(name);
        }

    });
}

public class ClientsHelper
{
    private HttpClient client = new HttpClient();
    string connect =  @"https://localhost:7235/api/Company/Get";

    public async Task<IEnumerable<CompanyName>> GetCompanyNames()
    {
        using var responce = await client.GetAsync(connect);

        if (responce.StatusCode == HttpStatusCode.BadRequest || responce.StatusCode == HttpStatusCode.NotFound)
        {
            // получаем информацию об ошибке
            Error? error = await responce.Content.ReadFromJsonAsync<Error>();
            return null;
        }
        else
        {
            // если запрос завершился успешно, получаем объект Person
            string lol = await responce.Content.ReadAsStringAsync();
            IEnumerable<CompanyName> names = await responce.Content.ReadFromJsonAsync<CompanyName[]>();

            return names;
        }
    }
}

public class CompanyName
{
    public string Name { get; set; }
    public long Id { get; set; }
}