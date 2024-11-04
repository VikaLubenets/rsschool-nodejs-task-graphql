import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from '../../types/profile.js';
import { Context } from '../../context.js';

export const ProfileMutation = {
  createProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      dto: { type: new GraphQLNonNull(CreateProfileInputType) },
    },
    async resolve(_parent, { dto }, { prisma }: Context) {
      return prisma.profile.create({
          data: dto,
      });
  },
  },

  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.profile.delete({
          where: { id },
      });

      return "Profile has been deleted";
  },
  },

  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      return prisma.profile.update({
          where: { id },
          data: dto,
      });
  },
  },
};