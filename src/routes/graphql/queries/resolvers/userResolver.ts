import { GraphQLList, GraphQLNonNull } from "graphql";
import prisma from "../../prisma.js";
import { UserType } from "../../types/user.js";
import { UUIDType } from "../../types/uuid.js";

export const userResolver = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async () => {
            try {
                return await prisma.user.findMany();
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }) => {
            try {
                return await prisma.user.findUnique({
                    where: { id },
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        },
    },
};
