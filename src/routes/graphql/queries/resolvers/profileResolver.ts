import { GraphQLList, GraphQLNonNull } from "graphql";
import { ProfileType } from "../../types/profile.js";
import { UUIDType } from "../../types/uuid.js";
import { Context } from "../../context.js";

export const profileResolver = {
    profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const data = await prisma.profile.findMany();
            return data;
        },
    },
    profile: {
        type: ProfileType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            const data = await prisma.profile.findUnique({
                    where: { id },
                });
            return data;
        },
    },

}