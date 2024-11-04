import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from '../../types/user.js';
import { Context } from '../../context.js';

export const UserMutation = {
  createUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInputType) },
    },
    async resolve(_parent, { dto }, { prisma }) {
      const newUser = await prisma.user.create({
          data: dto,
      });
      return newUser
  },
  },

  deleteUser: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.user.delete({
          where: { id },
      });

      return 'done';
  },
  },

  changeUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      const updatedUser = await prisma.user.update({
          where: { id },
          data: dto,
      });

      return updatedUser
  },
  },

  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve (_parent, { userId, authorId }, { prisma }: Context) {
      const subscription = await prisma.subscribersOnAuthors.create({
        data: { 
          subscriberId: userId, 
          authorId: authorId 
        },
      });
      return 'done';
    },
  },

  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve (
      _parent,
      { userId, authorId }: { userId: string; authorId: string },
      { prisma }: Context,
    ) {
     await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });
      return 'done'
    },
  },
};