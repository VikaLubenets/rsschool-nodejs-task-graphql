import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { Context } from '../context.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (_parent: User, _args, { prisma }: Context) => {
        return await prisma.post.findMany({
          where: { authorId: _parent.id },
        });
      },
    },
    profile: {
      type: ProfileType,
      resolve: async (_parent: User, _args, { prisma }: Context) => {
        return await prisma.profile.findUnique({
          where: { userId: _parent.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_parent, __, { prisma }) => {
          const subscriptions = await prisma.subscribersOnAuthors.findMany({
              where: { subscriberId: _parent.id },
              include: { author: true },
          });
          return subscriptions.map((sub) => sub.author);
      },
    },
    subscribedToUser: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
        resolve: async (_parent, __, { prisma }) => {
            const subscriptions = await prisma.subscribersOnAuthors.findMany({
                where: { authorId: _parent.id },
                include: { subscriber: true },
            });
            return subscriptions.map((sub) => sub.subscriber);
        },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
