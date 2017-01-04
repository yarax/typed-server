// @flow

import type {Body, RouteType} from '../types';

type User = {
  login: string,
  pass: string
};

export type Parameters = {
  user: Body<User>
};

type Route = {
  path: string,
  method: string,
  produces: ?string
}

export const route: Route = {
  path: '/login',
  method: 'post',
  produces: 'text/plain'
};

export type Response = string;

module.exports.controller = (params: Parameters): Response => {
  return `Hi, ${params.user.login}`;
}