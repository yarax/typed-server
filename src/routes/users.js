// @flow
const bodyHandler = (req, paramName) => {
  return req.body;
};

type Params = {
  user: {
    login: string,
    pass: string
  }
};

type Response<T> = {
  result: T,
  headers?: {string: string},
  status?: number
}

type Route = {
  path: string,
  method: string,
  parameters: Object,
  controller: Function
}

const LoginRoute: Route =   {
  path: '/login',
  method: 'post',
  parameters: {
    user: bodyHandler
  },
  controller: (params: Params): Response<string> => {
    return {
      result: `Hi, ${params.user.login}`
    }
  },
  produces: 'application/json'
};

module.exports = [LoginRoute];