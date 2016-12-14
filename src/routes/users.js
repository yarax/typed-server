// @flow

const bodyHandler = (req, paramName) => {
  return req.body;
};

type Response<T> = {
  result: T,
  headers?: {[string]: string}, // @TODO all headers as type
  status?: number
}
type ResponseWrapper<T> = {
  message: T,
  error: ?string
}
type Extract<T> = $ObjMap<T, ExtractCodomain>

type Route = {
  path: string,
  method: string,
  parameters: Object,
  controller: Function
}

type Handler = (req: any, param: string) => any
type ExtractCodomain = <V>(v: any) => Handler;

type RouteParams = {
  user: {
    login: string,
    pass: string
  },
  fuck: string
};

type RouteResponse = string;

// We need it in runtime
const parameters: Extract<RouteParams> = {
  user: bodyHandler,
  fuck: bodyHandler
};

const wrapResponse = (contentType: string, error: ?Error) =>
  (result: RouteResponse): Response<ResponseWrapper<RouteResponse>> => ({
  result: {
    message: result,
    error: error ? error.message : null
  },
  headers: {
    'Content-type': contentType
  }
});

const LoginRoute: Route = {
  path: '/login',
  method: 'post',
  parameters,
  controller: (params: RouteParams): Response<RouteResponse> => {
    return {
      result: `Hi, ${params.user.login}`
    }
  },
  produces: wrapResponse('application/json')
};

module.exports = [LoginRoute];