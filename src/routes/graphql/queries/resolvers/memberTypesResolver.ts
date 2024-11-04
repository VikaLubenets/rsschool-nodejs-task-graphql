import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeId } from "../../types/memberType.js";
import { Context } from "../../context.js";

export const memberTypeResolver = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            return await prisma.memberType.findMany();
        },
    },
    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeId) },
        },
        resolve: async (_parent, { id }: {id: string}, { prisma }: Context) => {
            return await prisma.memberType.findUnique({
                    where: { id },
                });
        },
    },

}