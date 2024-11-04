import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
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
      const newPost = await prisma.post.create({
        data: dto,
      });
      return newPost
    },
  },

  deletePost: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    async resolve(_parent, { id }, { prisma }: Context) {
      await prisma.post.delete({
        where: { id },
      });

      return 'done';
    },
  },

  changePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    async resolve(_parent, { id, dto }, { prisma }: Context) {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: dto,
      });
      return updatedPost
    },
  },
}; 
