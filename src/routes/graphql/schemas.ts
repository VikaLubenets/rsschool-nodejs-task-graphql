import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './queries/queries.js';
import { Mutations } from './mutations/mutations.js';
import { UserType } from './types/user.js';
import { MemberType } from './types/memberType.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { SubscribersOnAuthorsType } from './types/subscribersOnAuthors.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const graphqlSchema = new GraphQLSchema({
  types: [UserType, MemberType, PostType, ProfileType, SubscribersOnAuthorsType],
  query: RootQueryType, 
  mutation: Mutations
});
