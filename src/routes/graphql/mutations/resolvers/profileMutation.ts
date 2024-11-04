import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
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
      const newProfile = await prisma.profile.create({
          data: dto,
      });
      return newProfile
  },
  },

  deleteProfile: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.profile.delete({
          where: { id },
      });

      return 'done';
  },
  },

  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      const updatedProfile = await prisma.profile.update({
          where: { id },
          data: dto,
      });
      return updatedProfile
  },
  },
};