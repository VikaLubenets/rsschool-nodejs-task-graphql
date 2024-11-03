import { GraphQLList, GraphQLNonNull } from "graphql";
import { PostType } from "../../types/post.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const postResolver = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            try {
                return await prisma.post.findMany();
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        },
    },
    post: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            try {
                return await prisma.profile.findUnique({
                    where: { id },
                });
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        },
    },
}