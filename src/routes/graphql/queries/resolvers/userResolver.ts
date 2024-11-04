import { GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "../../types/user.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const userResolver = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const data = await prisma.user.findMany();
            return data;
        },
    },
    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            const data = await prisma.user.findUnique({
                    where: { id },
                });
            return data
        },
    },
};
