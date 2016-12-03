// @flow

const express = require('express');
const app = express();
const routes = require('./routes/users');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '64mb'}));

app.use((req, res, next) => {
  const route = routes.find(r => r.method.toLowerCase() === req.method.toLowerCase() 
    && r.path === req.path);
  if (!route) {
    return res.status(404).end();
  }
  const params = Object
    .keys(route.parameters)
    .reduce((res: Object, paramName: string) => {
      res[paramName] = route.parameters[paramName](req, paramName);
      return res;
    }, {});
  let response;
  try {
    response = route.controller(params);
  } catch (e) {
    return next(e);
  }
  // set cookie
  // set status
  res.send(response.result);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3003, console.log);