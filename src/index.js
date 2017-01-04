// @flow

const express = require('express');
const app = express();
const reqDir = require('require-dir');
const routes = reqDir(`${__dirname}/routes`);
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '64mb'}));

function routeMatch(req, route) {
  return route.method.toLowerCase() === req.method.toLowerCase() && route.path === req.path;
}

app.use((req, res, next) => {
  const routeName = Object.keys(routes).find(key => {
    return routeMatch(req, routes[key].route);
  });
  if (!routeName) {
    return res.status(404).end();
  }
  const route = routes[routeName];

  const params = route.parameters(req);
  let response;
  try {
    response = route.controller(params);
  } catch (e) {
    return next(e);
  }
  // set cookie
  // set status
  res.send(response);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

app.listen(3003, console.log);