export interface IRemoteDataError {
    httpCode: number,
    message: string,
    body: string | undefined
}

export interface Column {
    key: string
    displayLabel: string
}