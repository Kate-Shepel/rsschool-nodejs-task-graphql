import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

interface GraphQLResponse {
  data: null;
  errors?: unknown;
}

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
    async handler(req, reply) {
      // return graphql();
      console.log('--- GraphQL route handler is running ---');
      const response: GraphQLResponse = { data: null };
      return reply.send(response);
    },
  });
};

export default plugin;
