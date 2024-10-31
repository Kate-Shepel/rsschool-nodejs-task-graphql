import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { mainQuery } from './mainQuery.js';
import { mainMutation } from './mainMutation.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const graphqlSchema = new GraphQLSchema({
        query: mainQuery,
        mutation: mainMutation,
      });

      const graphqlQuery = req.body.query;
      const variables = req.body.variables;
      const errors = validate(graphqlSchema, parse(graphqlQuery), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }

      return graphql({
        schema: graphqlSchema,
        source: graphqlQuery,
        variableValues: variables,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
