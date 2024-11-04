import { GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "../../types/user.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const userResolver = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const users = await prisma.user.findMany();
            return users
        },
    },
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, context: Context) => {
            const user = await context.prisma.user.findUnique({
                where: { id },
            });

            return user
        },
    },
};
