import { GraphQLList, GraphQLNonNull } from "graphql";
import { PostType } from "../../types/post.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const postResolver = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const posts = await prisma.post.findMany();
            return posts
        },
    },
    post: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            const post = await prisma.post.findUnique({
                where: { id },
            });
            return post
        },
    },
}