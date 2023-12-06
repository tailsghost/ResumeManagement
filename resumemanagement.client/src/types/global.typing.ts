export interface ICompany {
    id: string,
    name: string,
    size: string,
    createAt: string
}


export interface ICreateCompanyDto {
    name: string,
    size: string,
}