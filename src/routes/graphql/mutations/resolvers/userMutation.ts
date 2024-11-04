import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
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
      return prisma.user.create({
          data: dto,
      });
  },
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.user.delete({
          where: { id },
      });

      return "User has been deleted";
  },
  },

  changeUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      return prisma.user.update({
          where: { id },
          data: dto,
      });
  },
  },

  subscribeTo: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { userId, authorId }, { prisma }: Context) {
      await prisma.subscribersOnAuthors.create({
          data: {
              subscriberId: userId,
              authorId: authorId,
          },
      });
      return "Subscription has been created";
    },
  },

  unsubscribeFrom: {
    type: GraphQLBoolean,
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
      return true;
    },
  },
};