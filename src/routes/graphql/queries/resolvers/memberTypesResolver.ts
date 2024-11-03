import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeIdEnum } from "../../types/memberType.js";
import prisma from "../../prisma.js";

export const memberTypeResolver = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async () => {
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
        resolve: async (_, { id }) => {
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