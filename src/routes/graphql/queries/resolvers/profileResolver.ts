import { GraphQLList, GraphQLNonNull } from "graphql";
import { ProfileType } from "../../types/profile.js";
import { UUIDType } from "../../types/uuid.js";
import prisma from "../../prisma.js";

export const profileResolver = {
    profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async () => {
            try {
                return await prisma.profile.findMany();
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        },
    },
    profile: {
        type: ProfileType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }) => {
            try {
                return await prisma.profile.findUnique({
                    where: { id },
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        },
    },

}