import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ChangePostInputType, CreatePostInputType, PostType } from '../../types/post.js';
import { Context } from '../../context.js';

export const PostMutation = {
  createPost: {
    type: new GraphQLNonNull(PostType),
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInputType) },
    },
    async resolve(_parent, { dto }, { prisma }: Context) {
      return prisma.post.create({
        data: dto,
      });
    },
  },

  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.post.delete({
        where: { id },
      });

      return "Post has been deleted";
    },
  },

  changePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      return prisma.post.update({
        where: { id },
        data: dto,
      });
    },
  },
}; 
