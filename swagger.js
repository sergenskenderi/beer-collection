const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Beer Collection',
    version: '1.0.0',
    description: 'API documentation for Beer Collection',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {},
};


function registerRoute(path, method, summary, handler, parameters = []) {
    if (!swaggerDocs.paths[path]) {
        swaggerDocs.paths[path] = {};
    }

    swaggerDocs.paths[path][method] = {
        summary,
        parameters,
        responses: {
            200: {
                description: 'Successful response',
            },
            201: {
                description: 'Successful response',
            },
            404: {
                description: 'Not Found',
            },
            400: {
                description: 'Bad Request',
            },
            500: {
                description: "Something went wrong. Server error.",
            },
        },
    };

    const expressRouter = require('express').Router();

    expressRouter[method](path, handler);

    return expressRouter;
}

const swaggerDefinition = swaggerJSDoc({ swaggerDefinition: swaggerDocs, apis: [] });
module.exports = { swaggerUi, swaggerDocs, registerRoute };
