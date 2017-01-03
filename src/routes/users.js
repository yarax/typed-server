// @flow

type Body<T> = T;

export type Parameters = {
  user: Body<{
    login: string,
    pass: string
  }>,
  fuck: Body<string>
};

export type Route = {
  path: '/login',
  method: 'post',
  produces: 'text/plain'
}

export type Response = string;

module.exports = (params: Parameters): Response => {
  return `Hi, ${params.user.login}`;
}