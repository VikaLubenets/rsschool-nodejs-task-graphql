import { GraphQLList, GraphQLNonNull } from "graphql";
import { PostType } from "../../types/post.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const postResolver = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const data = await prisma.post.findMany();
            return data;
        },
    },
    post: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            const data = await prisma.profile.findUnique({
                    where: { id },
                });
            return data
        },
    },
}