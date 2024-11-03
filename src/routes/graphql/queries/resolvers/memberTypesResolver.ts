import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeIdEnum } from "../../types/memberType.js";
import { Context } from "../../context.js";

export const memberTypeResolver = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async (_parent, _args, { prisma }: Context) => {
            try {
                return await prisma.memberType.findMany();
            } catch (error) {
                console.error("Error fetching memberTypes:", error);
            }
        },
    },
    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
        },
        resolve: async (_parent, { id }, { prisma }: Context) => {
            try {
                return await prisma.memberType.findUnique({
                    where: { id },
                });
            } catch (error) {
                console.error("Error fetching memberType:", error);
            }
        },
    },

}