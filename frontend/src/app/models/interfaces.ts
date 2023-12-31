export interface IRemoteDataError {
    httpCode: number,
    message: string,
    body: string | undefined
}
export type RequestState = 'loading' | 'error' | 'complete'
export interface Column {
    key: string
    displayLabel: string,
    mapper?: (any: any) => any
}
export interface SelectInputOption {
    name: string,
    value: string,
}
export type FormType = "Update" | "Create"
