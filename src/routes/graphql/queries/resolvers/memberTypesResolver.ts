import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeIdEnum } from "../../types/memberType.js";
import { Context } from "../../context.js";

export const memberTypeResolver = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            const data = await prisma.memberType.findMany();
            return data
        },
    },
    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            const data = await prisma.memberType.findUnique({
                    where: { id },
                });
            return data
        },
    },

}