import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { Context } from '../context.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(new GraphQLNonNull(PostType)),
      resolve: async (parent: User, _args, { prisma }: Context) => {
        return await prisma.post.findMany({
          where: { authorId: parent.id },
        });
      },
    },
    profile: {
      type: ProfileType,
      resolve: async (parent: User, _args, { prisma }: Context) => {
        return await prisma.profile.findUnique({
          where: { userId: parent.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async (parent: User, _args, { prisma }: Context) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
          include: { author: true },
        });
        return subscriptions.map(subscription => subscription.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: async (parent: User, _args, { prisma }: Context) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
          include: { subscriber: true },
        });
        return subscriptions.map(subscription => subscription.subscriber);
      },
    },
  }),
});
