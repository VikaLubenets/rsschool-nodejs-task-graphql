import { GraphQLList, GraphQLNonNull } from "graphql";
import { PostType } from "../../types/post.js";
import prisma from "../../prisma.js";
import { UUIDType } from "../../types/uuid.js";

export const postResolver = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: async () => {
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
        resolve: async (_, { id }) => {
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