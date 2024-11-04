import { GraphQLObjectType } from "graphql";
import { ProfileMutation } from "./resolvers/profileMutation.js";
import { UserMutation } from "./resolvers/userMutation.js";
import { PostMutation } from "./resolvers/postMutation.js";

export const Mutations = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        ...PostMutation,
        ...ProfileMutation,
        ...UserMutation
    },
  });