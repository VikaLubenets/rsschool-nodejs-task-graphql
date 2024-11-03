import { GraphQLList, GraphQLResolveInfo } from "graphql";
import { UserType } from "../../types/user.js";
import prisma from "../../prisma.js";

export const userResolver = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (
            obj, 
            args, 
            context, 
            info: GraphQLResolveInfo
        ) => {
            try {
                return await prisma.user.findMany();
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
};
