import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphqlSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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
      const { query, variables } = req.body;
      const validation = validate(graphqlSchema, parse(query), [depthLimit(5)]);

      if (validation.length) {
        return {
          errors: validation,
        };
      }

      const args = {
        schema: graphqlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      }

      return await graphql(args);
    },
  });
};

export default plugin;
