import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeIdEnum } from './memberType.js';
import { Profile } from '@prisma/client';
import { Context } from '../context.js';

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType }, 
    memberTypeId: { type: MemberTypeIdEnum }, 
    memberType: {
      type: MemberType,
      resolve: async (parent: Profile, _args, { prisma }: Context) => {
        return await prisma.memberType.findUnique({
          where: { id: parent.id },
        });
      },
    },
  }),
});