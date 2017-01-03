export type Response<T> = {
  result: T,
  headers?: {[string]: string}, // @TODO all headers as type
  status?: number
}

export type Extract<T> = $ObjMap<T, ExtractCodomain>

export type Route = {
  path: string,
  method: string,
  parameters: Object,
  controller: Function
}

export type Handler = (req: any, param: string) => any
export type ExtractCodomain = <V>(v: any) => Handler;