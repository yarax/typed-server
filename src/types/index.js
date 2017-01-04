export type Body<T> = T;

export type RouteType = {
  path: string,
  method: string,
  produces: ?string
}