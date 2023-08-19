export interface IRemoteDataError {
    httpCode: number,
    message: string,
    body: string | undefined
}